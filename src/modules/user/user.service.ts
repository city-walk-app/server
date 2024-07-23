import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserInfo } from './entity'
import { Result, renderID } from 'src/utils'
import { HttpCode, PrefixID } from 'src/enum'
import { SetUserInfoDto } from './dto'

@Injectable()
export class UserService {
  /**
   * @param userInfoEntity 用户信息表
   * @param jwtService jwt 服务
   * @param configService 配置服务
   * @param mailerService 邮件服务
   */
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>,
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
   * @param wx_open_id 微信 open id
   */
  async loginEmail(email: string, wx_open_id?: string) {
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

          // 设置 open id
          if (wx_open_id) {
            user.wx_open_id = wx_open_id
          }

          /** 用户参数列表 */
          const newUser = this.userInfoEntity.create(user)

          return await this.userInfoEntity.save(newUser)
        })()

    return new Result(HttpCode.OK, '登录成功', {
      token: this.createToken({ user_id: userInfo.user_id }),
      is_new_user: isNewUser,
      user_info: {
        user_id: userInfo.user_id,
        nick_name: userInfo.nick_name,
        email: userInfo.email,
        mobile: userInfo.mobile,
        avatar: userInfo.avatar,
        signature: userInfo.signature,
        birthday: userInfo.birthday,
        gender: userInfo.gender,
        preference_type: userInfo.preference_type
      }
    })
  }

  /**
   * open id 登录
   *
   * @param wx_open_id 微信 open id
   */
  async loginOpenId(wx_open_id: string) {
    /** 用户信息 */
    const userInfo = await this.userInfoEntity.findOneBy({ wx_open_id })

    console.log('openid', userInfo)

    if (!userInfo) {
      return new Result(HttpCode.ERR, '未注册')
    }

    return new Result(HttpCode.OK, '登录成功', {
      token: this.createToken({ user_id: userInfo.user_id }),
      is_new_user: false,
      user_info: {
        user_id: userInfo.user_id,
        nick_name: userInfo.nick_name,
        email: userInfo.email,
        mobile: userInfo.mobile,
        avatar: userInfo.avatar,
        signature: userInfo.signature,
        birthday: userInfo.birthday,
        gender: userInfo.gender,
        preference_type: userInfo.preference_type
      }
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
    body: SetUserInfoDto & { user_id: string; avatar?: string }
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
}
