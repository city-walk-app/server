import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserInfo } from './entity'
import { UserController } from './user.controller'
import { EmailService } from '../email'
import { UserMiddleware } from 'src/middleware'
// import { UserRoute, UserRouteList } from '../location/entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('DB_TOKEN_KEY')
      // signOptions: { expiresIn: '4h' }
    }
  }
})

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo]),
    jwtModule
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService]
})
export class UserModule implements NestModule {
  /**
   * 配置局部中间件
   *
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      /**
       * 指定哪些路由应该排除在中间件应用范围之外
       *
       * exclude 方法用于排除特定路径和方法的中间件应用
       *
       * method 参数可以使用 RequestMethod 枚举值来指定需要排除的 HTTP 方法
       *
       * RequestMethod.GET (0): 用于获取资源
       * RequestMethod.POST (1): 用于创建新资源
       * RequestMethod.PUT (2): 用于更新资源（替换整个资源）
       * RequestMethod.DELETE (3): 用于删除资源
       * RequestMethod.PATCH (4): 用于更新资源（部分更新）
       * RequestMethod.ALL (5): 用于所有 HTTP 方法
       * RequestMethod.OPTIONS (6): 用于获取服务器支持的 HTTP 方法
       * RequestMethod.HEAD (7): 类似于 GET 方法，但不返回响应体
       */
      .exclude({ path: '/user/login/email', method: RequestMethod.POST })
      .forRoutes('user')
  }
}
