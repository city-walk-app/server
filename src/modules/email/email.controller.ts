import { Controller, Body, Post, UseGuards } from '@nestjs/common'
import { EmailService } from './email.service'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { HttpCode } from 'src/enum'
import { Throttle, SkipThrottle } from '@nestjs/throttler'
import { CustomThrottlerGuard } from 'src/common'
import { SendEmailCodeDto } from './dto'

/**
 * 邮件相关接口列表
 */
@Controller('email')
@ApiTags('邮箱')
@SkipThrottle()
export class EmailController {
  /**
   * @param emailService 邮件服务
   */
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({ summary: '发送获取邮箱验证码' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  @ApiParam({ name: 'email', description: '邮箱', required: true })
  /**
   * 发送获取邮箱验证码
   *
   * @param body 请求参数
   */
  @Post('/send')
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  @UseGuards(CustomThrottlerGuard)
  sendEmailCode(@Body() body: SendEmailCodeDto) {
    const { email } = body

    /** 生成随机验证码 */
    const code: string = Math.floor(100000 + Math.random() * 900000).toString()

    return this.emailService.sendEmailCode(code, email)
  }
}
