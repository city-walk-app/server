import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserInfo } from './entity'
import { Result, renderID } from 'src/utils'
import { HttpCode, PrefixID } from 'src/enum'
import { UserRoute, UserRouteList } from '../gps'
import { SetUserInfoDTO } from './dto'

@Injectable()
export class UserService {
  /**
   * @param userInfoEntity 用户信息表
   * @param userRouteEntity 步行记录数据表
   * @param userRouteListEntity 步行记录列表数据表
   * @param jwtService jwt 服务
   * @param configService 配置服务
   * @param mailerService 邮件服务
   */
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>,
    @InjectRepository(UserRoute)
    private readonly userRouteEntity: Repository<UserRoute>,
    @InjectRepository(UserRouteList)
    private readonly userRouteListEntity: Repository<UserRouteList>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService
  ) {}

  /**
   * 生成 token
   *
   * @param user 用户信息
   */
  createToken(user: Partial<UserInfo>) {
    return this.jwtService.sign(user)
  }

  /**
   * 新注册了用户给我自己发送一封邮件
   *
   * @param email 注册者邮箱地址
   */
  async noticeNewUseRegister(email: string) {
    await this.mailerService.sendMail({
      /**
       * 接收者的邮箱
       */
      to: this.configService.get('DB_NEW_USER_REGISTER_SEND_EMAIL'),
      /**
       * 发件人地址
       */
      from: this.configService.get('DB_EMAIL_SEND'),
      /**
       * 主题行
       */
      subject: '【City Walk】新用户注册',
      /**
       * HTML 正文内容
       */
      html: `新用户 ${email} 刚刚注册。`
    })
  }

  /**
   * 电子邮箱验证码登录
   *
   * @param email 邮箱
   */
  async loginEmail(email: string) {
    /** 用户信息 */
    const foundUserInfo = await this.userInfoEntity.findOneBy({ email })
    /** 是否为新用户 */
    const isNewUser = !foundUserInfo

    // 如果是新用户，立刻通知开发者或者运营
    if (isNewUser) {
      this.noticeNewUseRegister(email)
    }

    /**
     * 如果用户信息存在，代表已经注册过了
     *
     * 如果不存在，则直接注册新用户
     */
    const userInfo = foundUserInfo
      ? foundUserInfo
      : await (async () => {
          const user = new UserInfo()

          user.email = email
          user.created_at = new Date()
          user.user_id = renderID(PrefixID.user).toString()

          console.log(
            renderID(PrefixID.user),
            renderID(PrefixID.user).toString()
          )

          /** 用户参数列表 */
          const newUser = this.userInfoEntity.create(user)

          return await this.userInfoEntity.save(newUser)
        })()

    return new Result(HttpCode.OK, '登录成功', {
      token: this.createToken({ user_id: userInfo.user_id }),
      is_new_user: isNewUser,
      user_id: userInfo.user_id,
      email: userInfo.email,
      avatar: userInfo.avatar
    })
  }

  /**
   * 获取指定用户的信息
   *
   * @param user_id 用户 id
   */
  async getUserInfo(user_id: string) {
    /** 返回当前用户信息 */
    const data = await this.userInfoEntity.findOneBy({ user_id })

    if (data) {
      return new Result(HttpCode.OK, 'ok', data)
    }

    return new Result(HttpCode.ERR, '用户不存在')
  }

  /**
   * 设置用户信息
   *
   * @param body 参数体
   */
  async setUserInfo(
    body: SetUserInfoDTO & { user_id: string; avatar?: string }
  ) {
    /**
     * 通过 id 和邮箱查找用户
     *
     * @see EntityManager https://typeorm.io/working-with-entity-manager
     */
    const user: UserInfo = await this.userInfoEntity.findOneBy({
      user_id: body.user_id
    })

    // 如果没查到，返回错误信息
    if (!user) {
      return new Result(HttpCode.ERR, '用户不存在，请检查参数')
    }

    /** 获取参数键数组 */
    const bodyKeys: string[] = Object.keys(body).filter(
      (item) => item !== 'user_id'
    )

    for (const key of bodyKeys) {
      if (body[key] && key in user) {
        user[key] = body[key]
      }
    }

    const data = await this.userInfoEntity.save(user)

    if (data) {
      return new Result(HttpCode.OK, '修改成功', data)
    }

    return new Result(HttpCode.ERR, '修改失败')
  }

  /**
   * 头像上传
   *
   * @param id id
   * @param avatar 文件地址
   */
  setAvatar(user_id: string, avatar: string) {
    return this.setUserInfo({ user_id, avatar })
  }

  /**
   * 获取用户的动态发布日历热力图
   *
   * @param user_id 用户 id
   * @param year 年份
   */
  async getCalendarHeatmap(user_id, year) {
    /** 今年的开始日期 */
    const startDate = new Date(year, 0, 1)
    /** 今年的结束日期 */
    const endDate = new Date(year, 11, 31)

    /** 获取到当年指定用户打卡记录 */
    const currentYearRouters = await this.userRouteListEntity
      .createQueryBuilder('user_route_list')
      .where('user_route_list.create_at >= :startDate', { startDate })
      .andWhere('user_route_list.create_at <= :endDate', { endDate })
      .andWhere('user_route_list.user_id = :user_id', { user_id })
      .getMany()

    const currentYearRouterLists = await Promise.all(
      currentYearRouters.map(async (item) => {
        /** 详细位置信息 */
        const route_detail = await this.userRouteEntity.find({
          where: { list_id: item.id }
        })

        return {
          ...item,
          route_detail: route_detail.length || 0,
          city: route_detail[0]?.city,
          province: route_detail[0]?.province
        }
      })
    )

    // 创建日历热力图数据结构
    const calendarHeatmap = {}

    // 循环生成一年中所有日期的信息
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= getDaysInMonth(month, 2024); day++) {
        const dateKey = formatDate(year, month + 1, day) // 生成形如 '2024-01-01' 的日期字符串
        calendarHeatmap[dateKey] = { count: [], opacity: 0 } // 将日期作为键，空对象作为对应的值存储在 calendarHeatmap 中
      }
    }

    // 获取指定月份的天数
    function getDaysInMonth(month, year) {
      return new Date(year, month + 1, 0).getDate()
    }

    // 格式化日期为 'YYYY-MM-DD' 形式
    function formatDate(year, month, day) {
      return `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`
    }

    // 将打卡记录按日期分类
    currentYearRouterLists.forEach((route) => {
      const dateKey = route.create_at.toISOString().split('T')[0] // 获取打卡日期，格式为YYYY-MM-DD

      calendarHeatmap[dateKey].count.push({
        ...route,
        type: 'route'
      })
    })

    // 设置每天的透明度
    const dates = Object.keys(calendarHeatmap)

    dates.forEach((date) => {
      const { count } = calendarHeatmap[date]
      calendarHeatmap[date].opacity =
        count && count.length > 0 ? (count.length / 10) * 0.9 + 0.1 : 0 // 计算透明度，根据动态数量设置
    })

    const result = []

    for (const key in calendarHeatmap) {
      result.push({
        date: key,
        ...calendarHeatmap[key]
      })
    }

    function chunkArray(arr, size) {
      const chunkedArr = []
      for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size))
      }
      return chunkedArr
    }

    const chunkedArray = chunkArray(result, 7)

    return new Result(HttpCode.OK, 'ok', chunkedArray)
  }
}
