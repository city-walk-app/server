import { Body, Controller, Post } from '@nestjs/common'
import { WxService } from './wx.service'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { GetOpenIdDto } from './dto'

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

  @ApiOperation({ summary: '获取 open id' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'code', description: 'code', required: true })
  /**
   * 获取 open id
   *
   * @param body 请求参数
   */
  @Post('/get/open_id')
  getOpenId(@Body() body: GetOpenIdDto) {
    return this.wxService.getOpenId(body.code)
  }
}
