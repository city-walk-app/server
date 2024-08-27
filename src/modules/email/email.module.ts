import { Module } from '@nestjs/common'
/**
 * 邮箱验证码模块
 *
 * @see mailer https://github.com/nest-modules/mailer
 */
import { MailerModule } from '@nestjs-modules/mailer'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerService } from 'src/common'

/**
 * @see QQ邮箱设置 https://wx.mail.qq.com/account/index?sid=zbF6RIzqa0oulTFWAFdKTAAA#/?tab=device
 */

@Module({
  imports: [
    /**
     * 速率限制模块
     */
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1
      }
    ]),
    /**
     * 邮箱模块
     *
     * @see NestJS-Mailer https://nest-modules.github.io/mailer/
     */
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('DB_EMAIL_HOST'), // SMTP 服务器主机名
            port: 587,
            secure: false, // 是否使用安全连接（TLS 或 SSL）
            // 发送方的账号和授权码
            auth: {
              user: configService.get('DB_EMAIL_AUTH_USER'),
              pass: configService.get('DB_EMAIL_AUTH_PASS')
            }
          }
        }
      }
    })
  ],
  controllers: [EmailController],
  providers: [EmailService, LoggerService]
})
export class EmailModule {}
