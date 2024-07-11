import { Controller, Post } from '@nestjs/common'
import { WxService } from './wx.service'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 微信相关
 */
@Controller('wx')
@ApiTags('微信')
export class WxController {
  /**
   * @param wxService 管理服务
   */
  constructor(private readonly wxService: WxService) {}

  @ApiOperation({ summary: '获取邀请二维码' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取邀请二维码
   */
  @Post('/get/invite/qr_code')
  getInviteQrCode() {
    return this.wxService.getInviteQrCode()
  }
}
