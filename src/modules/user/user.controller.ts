import { Controller, Post, Body, Req } from '@nestjs/common'
import { EmailService } from '../email'
import { UserService } from './user.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { Result } from 'src/utils'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import {
  LoginEmailDto,
  GetUserInfoDto,
  SetUserInfoDto,
  LoginOpenIdDto
} from './dto'

/**
 * 用户相关模块
 */
@Controller('user')
@ApiTags('用户')
export class UserController {
  /**
   * @param userService 用户服务
   * @param emailService 邮箱服务
   */
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  @ApiOperation({ summary: '邮箱验证码登录' })
  @ApiResponse({ status: HttpCode.OK, description: '登录成功' })
  @ApiParam({ name: 'email', description: '邮箱', required: true })
  @ApiParam({ name: 'code', description: '验证码', required: true })
  /**
   * 邮箱验证码登录
   *
   * @param body 请求参数
   */
  @Post('/login/email')
  async loginEmail(@Body() body: LoginEmailDto) {
    const { email, code } = body

    /** 检测验证码是否正确 */
    const codeResult = await this.emailService.validatorCode(email, code)

    // 验证码正确
    if (codeResult.code === HttpCode.OK) {
      return await this.userService.loginEmail(body.email)
    }

    // 验证码不正确
    return new Result(HttpCode.ERR, '验证码不正确')
  }

  @ApiOperation({ summary: '获取指定用户信息' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'id', description: '用户 id', required: true })
  /**
   * 获取指定用户信息
   *
   * @param body 请求参数
   */
  @Post('/get/user_info')
  getUserInfo(@Body() body: GetUserInfoDto) {
    return this.userService.getUserInfo(body.user_id)
  }

  @ApiOperation({ summary: '设置用户信息' })
  /**
   * 设置用户信息
   *
   * @param req 请求
   * @param body 请求参数
   */
  @Post('/set/user_info')
  setUserInfo(@Req() req: Request, @Body() body: SetUserInfoDto) {
    const { user_id } = req[USER_INFO]

    return this.userService.setUserInfo({ ...body, user_id })
  }

  @ApiOperation({ summary: 'open id 登录' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'wx_open_id', description: 'open id', required: true })
  /**
   * open id 登录
   *
   * @param body 请求参数
   */
  @Post('/login/open_id')
  loginOpenId(@Body() body: LoginOpenIdDto) {
    return this.userService.loginOpenId(body.wx_open_id)
  }
}
