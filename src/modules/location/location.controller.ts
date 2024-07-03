import { Controller, Body, Post, Get } from '@nestjs/common'
import { LocationService } from './location.service'
import { EmailService } from '../email/email.service'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 邮件相关接口列表
 */
@Controller('location')
@ApiTags('位置服务')
export class LocationController {
  /**
   * @param adminService 邮件服务
   */
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取用户列表
   */
  @Get('/user/list')
  getUserList() {
    return 123
  }
}
