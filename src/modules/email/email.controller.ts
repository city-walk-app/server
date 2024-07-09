import { Controller, Body, Post } from '@nestjs/common'
import { EmailService } from './email.service'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { HttpCode } from 'src/enum'

/**
 * 邮件相关接口列表
 */
@Controller('email')
@ApiTags('邮箱')
export class EmailController {
  /**
   * @param emailService 邮件服务
   */
  constructor(private readonly emailService: EmailService) { }

  @ApiOperation({ summary: '发送获取邮箱验证码' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  @ApiParam({ name: 'email', description: '邮箱', required: true })
  /**
   * 发送获取邮箱验证码
   *
   * @param body 请求体
   * @param body.email 邮箱地址
   */
  @Post('/send')
  sendEmailCode(@Body() body: { email: string }) {
    const { email } = body

    /** 生成随机验证码 */
    const code: string = Math.floor(100000 + Math.random() * 900000).toString()

    return this.emailService.sendEmailCode(code, email)
  }
}
