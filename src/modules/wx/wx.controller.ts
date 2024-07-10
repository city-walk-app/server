import { Controller, Post } from '@nestjs/common'
import { WxService } from './wx.service'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 邮件相关接口列表
 */
@Controller('wx')
@ApiTags('微信')
export class WxController {
  /**
   * @param wxService 管理服务
   */
  constructor(private readonly wxService: WxService) {}

  @ApiOperation({ summary: '生成邀请二维码' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 生成邀请二维码
   */
  @Post('/get/qr_code')
  getQrCode() {
    return this.wxService.getQrCode()
  }

  @ApiOperation({ summary: '获取 AccessToken' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取 AccessToken
   */
  @Post('/get/access_token')
  getParams() {
    return this.wxService.getAccessToken()
  }
}
