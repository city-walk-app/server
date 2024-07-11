import { Module, Global } from '@nestjs/common'
import { RedisService } from './redis.service'

/**
 * Redis 模块配置
 * 
 * @Global() 装饰器在 NestJS 中用于将一个模块标记为全局模块
 * 
 * 全局模块在整个应用程序中只需要导入一次，并且它提供的服务将自动在所有其它模块中可用，而不需要显式导入该模块
 * 
 * @see GlobalModules https://docs.nestjs.com/modules#global-modules
 */

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule { }