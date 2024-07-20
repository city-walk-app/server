import { Injectable } from '@nestjs/common'
// import { UserInfo } from '../user'
// import { InjectRepository } from '@nestjs/typeorm'
// import { Repository } from 'typeorm'
// import { Result } from 'src/utils'
// import { HttpCode } from 'src/enum'
import { ConfigService } from '@nestjs/config'
import { HttpCode } from 'src/enum'
import { OssService } from 'src/service'
import { Result } from 'src/utils'

@Injectable()
export class UniversalService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ossService: OssService
  ) {}

  /**
   * 上传公开文件
   */
  async contentUpload() {
    /** 获取当前时间，设置过期时间为一天 */
    const date = new Date()
    date.setDate(date.getDate() + 1)

    const client = this.ossService.getClient()

    const policy = {
      expiration: date.toISOString(), //设置签名过期日期
      conditions: [
        ['content-length-range', 0, 1048576000] //设置文件大小限制
      ]
    }

    const formData = await client.calculatePostSignature(policy)

    const bucket = this.configService.get('DB_OSS_BUCKET')
    const region = this.configService.get('DB_OSS_REGION')
    const host = `http://${bucket}.${region}.aliyuncs.com`

    const data = {
      host, // 返回上传的 url
      policy: formData.policy, // 返回政策
      OSSAccessKeyId: formData.OSSAccessKeyId, // 返回秘钥
      signature: formData.Signature // 返回签名
    }

    return new Result(HttpCode.OK, 'ok', data)
  }
}
