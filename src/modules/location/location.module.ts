import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationService } from './location.service'
import { LocationController } from './location.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import { UserMiddleware } from 'src/middleware'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserVisitedProvince,
      UserRoute,
      UserRouteList
    ]),
    JwtModule
  ],
  controllers: [LocationController],
  providers: [LocationService, EmailService],
  exports: [LocationService]
})
// export class LocationModule {}
export class LocationModule implements NestModule {
  /**
   * 配置局部中间件
   *
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }) // 注册到所有路由
  }
}
