import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import Redis from 'ioredis'
import { ConfigService } from '@nestjs/config'

/**
 * Redis 服务
 * 
 * @see ioredis https://github.com/redis/ioredis
 */
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  /**
   * redis 实例
   */
  private instance: Redis

  /**
   * @param configService 配置服务
   */
  constructor(private readonly configService: ConfigService) { }

  /**
   * 模块初始化执行的回调
   * 
   * @see LifecycleEvents https://docs.nestjs.com/fundamentals/lifecycle-events
   */
  onModuleInit() {
    if (!this.instance) {
      this.instance = new Redis({
        /**
         * 主机地址
         */
        host: this.configService.get('DB_REDIS_HOST'),
        /**
         * 端口
         */
        port: this.configService.get('DB_REDIS_PORT'),
      })

      this.instance.on('error', (err) => {
        console.error('Redis 错误:', err)
      })

      this.instance.on('connect', () => {
        console.log('Redis 链接成功')
      })
    }
  }

  /**
   * 模块销毁执行的回调
   * 
   * @see LifecycleEvents https://docs.nestjs.com/fundamentals/lifecycle-events
   */
  onModuleDestroy() {
    if (this.instance) {
      this.instance.quit()
    }
  }

  /**
   * 获取 redis 实例
   */
  getInstance(): Redis {
    return this.instance
  }
}