import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import Redis from 'ioredis'
import { ConfigService } from '@nestjs/config'
import { Result } from 'src/utils'
import { RedisService } from 'src/service'
import { HttpCode } from 'src/enum'

/** 过期时间 */
const EXPIRE_TIME = 300000

@Injectable()
export class EmailService {
  /**
   * redis 实例
   */
  private redisInstance: Redis

  /**
   * @param mailerService 邮箱服务
   * @param configService 配置服务
   * @param redisService redis 服务
   */
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.redisInstance = this.redisService.getInstance()
  }

  /**
   * 获取邮箱验证码
   *
   * @param code 验证码
   * @param email 邮箱地址
   */
  async sendEmailCode(code: string, email: string) {
    await this.mailerService.sendMail({
      /**
       * 接收者的邮箱
       */
      to: email,
      /**
       * 发件人地址
       */
      from: this.configService.get('DB_EMAIL_SEND'),
      /**
       * 主题行
       */
      subject: `【City Walk】验证码 ${code}`,
      /**
       * HTML 正文内容
       */
      html: `你的验证码是：${code}</b>。不要告诉任何人！！！🤫🤫🤫 <br /><br /> 验证码有效时长为 5 分钟。`
    })

    /** 存储的数据 */
    const data = {
      email,
      code,
      time: new Date().getTime()
    } as const

    /**
     * 使用 hash 存储数据
     *
     * @see hash https://github.com/luin/ioredis/blob/main/examples/hash.js
     */
    await this.redisInstance.hmset(email, data)

    // 设置失效时间
    await this.redisInstance.expire(email, EXPIRE_TIME)

    return new Result(HttpCode.OK, '获取成功')
  }

  /**
   * 验证验证码
   *
   * 验证码过期时间为 300000 毫秒 （5分钟）
   *
   * 目前在验证码失效，或者成功之后，删除 redis 中存储的验证码
   *
   * @param email 邮箱
   * @param code 验证码
   */
  async validatorCode(email: string, code: string) {
    /** 获取到所有的邮箱验证码键值对 */
    const all = await this.redisInstance.hgetall(email)

    // 如果没有查找到该邮箱的
    if (!all) {
      return new Result(HttpCode.ERR, '邮箱错误')
    }

    /** 获取当前时间戳 */
    const time: number = new Date().getTime()

    // 验证码过期
    if (time - Number(all.time) > EXPIRE_TIME) {
      this.redisInstance.del(email)
      return new Result(HttpCode.ERR, '验证码已失效，请重新获取')
    }

    // 验证码正确
    if (all.code === code) {
      this.redisInstance.del(email)
      return new Result(HttpCode.OK, '验证码正确')
    }

    return new Result(HttpCode.ERR, '验证码错误')
  }
}
