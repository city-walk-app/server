import { Controller, Body, Post, Get } from '@nestjs/common'
import { AdminService } from './admin.service'
import { EmailService } from '../email/email.service'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 邮件相关接口列表
 */
@Controller('admin')
@ApiTags('后台')
export class AdminController {
  /**
   * @param adminService 邮件服务
   */
  constructor(
    private readonly adminService: AdminService,
    private readonly emailService: EmailService
  ) {}

  @ApiOperation({ summary: '获取用户列表' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取用户列表
   */
  @Get('/user/list')
  getUserList() {
    return this.adminService.getUserList()
  }

  /**
   * 登录
   *
   * @param body 请求参数
   * @param body.email 邮箱
   * @param body.code 验证码
   */
  @Post('/login')
  async login(@Body() body: { email: string; code: string }) {
    const { email, code } = body

    if (!email || !code) {
      return new Result(HttpCode.ERR, '缺少必要参数')
    }

    /** 检测验证码是否正确 */
    const codeResult = await this.emailService.validatorCode(email, code)

    // 验证码正确
    if (codeResult.code === HttpCode.OK) {
      return this.adminService.login(body.email)
    }

    // 验证码不正确
    return new Result(HttpCode.ERR, '验证码不正确')
  }
}
