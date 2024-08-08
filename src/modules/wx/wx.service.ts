import {
  Injectable,
  BadGatewayException,
  BadRequestException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpCode, Wx } from 'src/enum'
import { Result } from 'src/utils'
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

  /**
   * 获取微信饿二维码
   *
   * @param access_token access_token
   */
  private async getWeChartQrCode(access_token: string) {
    const res = await this.httpService.axiosRef.post(
      Wx.WxaGetwxacode + `?access_token=${access_token}`,
      JSON.stringify({ path: 'pages/home/index?code=1212211' }),
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log(res.data)

    if (!res.data || !Buffer.isBuffer(res.data)) {
      throw new BadGatewayException('二维码生成错误')
    }

    const base64Image = Buffer.from(res.data).toString('base64')
    const qrCodeBase64 = `data:image/png;base64,${base64Image}`

    return qrCodeBase64
  }

  /**
   * 获取 access_token
   */
  private async getAccessToken() {
    const res = await this.httpService.axiosRef.get(Wx.CgiBinToken, {
      params: {
        grant_type: this.configService.get('DB_WX_GRANT_TYPE'),
        appid: this.configService.get('DB_WX_APPID'),
        secret: this.configService.get('DB_WX_SECRET')
      }
    })

    if (!res.data || !res.data.access_token) {
      throw new BadRequestException('获取 access_token 异常')
    }

    return res.data
  }

  /**
   * 获取邀请二维码
   */
  async getInviteQrCode() {
    /**
     * 获取 access_token
     */
    const accessTokenRes = await this.getAccessToken()
    /**
     * 获取二维码
     */
    const qrCode = await this.getWeChartQrCode(accessTokenRes.access_token)

    return new Result(HttpCode.OK, 'ok', qrCode)
  }

  /**
   * open id 登录
   *
   * @param code code
   */
  async getOpenId(code: string) {
    const res = await this.httpService.axiosRef.get(Wx.SnsJscode2session, {
      params: {
        grant_type: 'authorization_code',
        appid: this.configService.get('DB_WX_APPID'),
        secret: this.configService.get('DB_WX_SECRET'),
        js_code: code
      }
    })

    console.log(res.data)

    return new Result(HttpCode.OK, 'ok', res.data)
  }
}
