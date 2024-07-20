import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import Redis from 'ioredis'
import { ConfigService } from '@nestjs/config'
import * as OSS from 'ali-oss'

/**
 * oss 服务
 *
 * 阿里云 OSS 配置
 *
 * @see 购买 https://www.aliyun.com/product/oss
 * @see 教程 https://juejin.cn/post/7364427985599037449
 * @see 文档 https://help.aliyun.com/zh/oss/developer-reference/getting-started-with-oss-sdk-for-node-js?spm=a2c4g.11186623.0.0.39ad49d1BT7Bf0
 */
@Injectable()
export class OssService implements OnModuleInit {
  /**
   * 实例
   */
  private client: OSS

  /**
   * @param configService 配置服务
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * 模块初始化执行的回调
   *
   * @see LifecycleEvents https://docs.nestjs.com/fundamentals/lifecycle-events
   */
  onModuleInit() {
    if (!this.client) {
      this.client = new OSS({
        region: this.configService.get('DB_OSS_REGION'),
        accessKeyId: this.configService.get('DB_OSS_ACCESS_KEY_ID'),
        accessKeySecret: this.configService.get('DB_OSS_ACCESS_KET_SECRET'),
        bucket: this.configService.get('DB_OSS_BUCKET')
      })
    }
  }

  /**
   * 获取实例
   */
  getClient(): OSS {
    return this.client
  }
}
