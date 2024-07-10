import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpCode, Wx } from 'src/enum'
import { Result } from 'src/utils'
// import axios from 'axios'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class WxService {
  /**
   * @param configService 配置服务
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async getQrCode() {
    return 123
  }

  /**
   * 获取 AccessToken
   */
  async getAccessToken() {
    const res = await this.httpService.axiosRef.get(Wx.CgiBinToken, {
      params: {
        grant_type: this.configService.get('DB_WX_GRANT_TYPE'),
        appid: this.configService.get('DB_WX_APPID'),
        secret: this.configService.get('DB_WX_SECRET')
      }
    })

    return new Result(HttpCode.OK, 'ok', res.data)
  }
}
