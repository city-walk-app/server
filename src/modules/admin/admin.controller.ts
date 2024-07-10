import { Controller, Post } from '@nestjs/common'
import { AdminService } from './admin.service'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 邮件相关接口列表
 */
@Controller('admin')
@ApiTags('后台')
export class AdminController {
  /**
   * @param adminService 管理服务
   */
  constructor(private readonly adminService: AdminService) { }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取用户列表
   */
  @Post('/user/list')
  getUserList() {
    return this.adminService.getUserList()
  }
}
