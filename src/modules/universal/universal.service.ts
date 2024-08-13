import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpCode } from 'src/enum'
import { OssService } from 'src/service'
import { Result, getCurrentDateFormatted } from 'src/utils'
import * as crypto from 'crypto'
import { ContentUploadDto } from './dto'

@Injectable()
export class UniversalService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ossService: OssService
  ) {}

  /**
   * 生成文件名
   */
  private renderFileName() {
    /** 获取当前时间的时间戳 */
    const timestamp = Date.now()
    /** 生成一个随机的 16 进制字符串 */
    const randomId = crypto.randomBytes(8).toString('hex')

    return `${timestamp}-${randomId}`
  }

  /**
   * 上传公开文件
   */
  async contentUpload(body: ContentUploadDto) {
    /** 获取当前时间，设置过期时间为一天 */
    const date = new Date()
    date.setDate(date.getDate() + 1)

    const client = this.ossService.getClient()

    /**
     * 授权第三方
     *
     * @see Node.js https://help.aliyun.com/zh/oss/use-cases/node-js?spm=a2c4g.11186623.0.0.15db5d03oLk0cl
     * @see content-length-range https://help.aliyun.com/zh/oss/support/0006-00000219?spm=5176.28426678.J_HeJR_wZokYt378dwP-lLl.5.34915181a5mI9I&scm=20140722.S_help@@%E6%96%87%E6%A1%A3@@480302.S_BB1@bl+BB2@bl+RQW@ag0+os0.ID_480302-RL_%E6%A0%BC%E5%BC%8F%E4%B8%BAcontent~DAS~length~DAS~range-LOC_search~UND~helpdoc~UND~item-OR_ser-V_3-P0_1
     */
    const policy = {
      expiration: date.toISOString(), // 设置签名过期日期
      conditions: [
        ['content-length-range', 0, 1048576000] // 设置文件大小限制
      ]
    }

    const formData = await client.calculatePostSignature(policy)

    const bucket = this.configService.get('DB_OSS_BUCKET')
    const region = this.configService.get('DB_OSS_REGION')
    const host = `https://${bucket}.${region}.aliyuncs.com`
    /** 上传的文件名 */
    const fileName = this.renderFileName() + body.suffix // 可以通过某种方式生成唯一的文件名称
    /** 上传的路径 */
    const filePath =
      this.configService.get('DB_OSS_FILE_PARTH') + getCurrentDateFormatted()

    const data = {
      host, // 返回上传的 url
      policy: formData.policy, // 返回政策
      OSSAccessKeyId: formData.OSSAccessKeyId, // 返回秘钥
      signature: formData.Signature, // 返回签名
      key: `${filePath}/${fileName}` // 上传的路径
    } as const

    return new Result(HttpCode.OK, 'ok', data)
  }
}
