import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserInfo } from './entity'
import { Result, isString, renderID } from 'src/utils'
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
          user.nick_name = this.geteDefaultNickName()

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
        gender: userInfo.gender
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
      throw new BadRequestException('未注册')
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
        gender: userInfo.gender
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
    const userInfo = await this.userInfoEntity.findOneBy({ user_id })

    if (!userInfo) {
      throw new BadRequestException('用户不存在')
    }

    return new Result(HttpCode.OK, 'ok', {
      user_id: userInfo.user_id,
      nick_name: userInfo.nick_name,
      email: userInfo.email,
      mobile: userInfo.mobile,
      avatar: userInfo.avatar,
      signature: userInfo.signature,
      birthday: userInfo.birthday,
      gender: userInfo.gender
    })
  }

  /**
   * 设置用户信息
   *
   * @param body 参数体
   */
  async setUserInfo(
    body: SetUserInfoDto & { user_id: string; avatar?: string }
  ) {
    const { mobile, nick_name, signature, birthday, gender, avatar, user_id } =
      body

    /**
     * 通过 id 和邮箱查找用户
     *
     * @see EntityManager https://typeorm.io/working-with-entity-manager
     */
    const user: UserInfo = await this.userInfoEntity.findOneBy({
      user_id
    })

    // 如果没查到，返回错误信息
    if (!user) {
      throw new BadRequestException('用户不存在')
    }

    // 设置手机
    if (mobile && isString(mobile)) {
      user.mobile = mobile
    }

    // 设置昵称
    if (nick_name && isString(nick_name)) {
      user.nick_name = nick_name
    }

    // 设置签名
    if (signature && isString(signature)) {
      user.signature = signature
    }

    // 设置生日
    if (birthday && isString(birthday)) {
      user.birthday = birthday
    }

    // 设置性别
    if (gender && isString(gender)) {
      user.gender = gender
    }

    // 设置头像
    if (avatar && isString(avatar)) {
      user.avatar = avatar
    }

    const data = await this.userInfoEntity.save(user)

    if (data) {
      return new Result(HttpCode.OK, '修改成功', {
        user_id: data.user_id,
        nick_name: data.nick_name,
        email: data.email,
        mobile: data.mobile,
        avatar: data.avatar,
        signature: data.signature,
        birthday: data.birthday,
        gender: data.gender
      })
    }

    throw new BadRequestException('修改失败')
  }

  /**
   * 获取默认用户名
   */
  private geteDefaultNickName(): string {
    const prefix = '新用户'
    const letters =
      'AdBCDEdaFGdasdaHIJfsKLMNOerPQRtdSTdUVfdsdatWXYZabdcdefgyohijklmnobpqrsktuvwxyz'
    let randomLetters = ''

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length)
      randomLetters += letters[randomIndex]
    }

    return prefix + randomLetters
  }
}
