import { join } from 'path'
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer
} from '@nestjs/common'
import {
  // APP_FILTER,
  APP_PIPE
} from '@nestjs/core'
// import { CustomExceptionFilter } from 'src/common'
/**
 * 数据库配置
 *
 * @see nestjstypeorm https://github.com/nestjs/typeorm
 * @see typeorm https://typeorm.io
 */
import { TypeOrmModule } from '@nestjs/typeorm'
/**
 * 静态文件访问模块
 *
 * @see serve-static https://github.com/nestjs/serve-static
 */
import { ServeStaticModule } from '@nestjs/serve-static'
/**
 * env 配置模块
 *
 * @see config https://github.com/nestjs/config
 */
import { ConfigModule, ConfigService } from '@nestjs/config'
/** 模块列表 */
import { UserModule, EmailModule, LocationModule, FriendModule } from './modules'
import { AppController } from './app.controller'
import { ValidationPipe } from 'src/common'
import { UserMiddleware } from 'src/middleware'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    /**
     * 数据库配置
     *
     * @see 数据库 https://docs.nestjs.cn/9/techniques?id=%e6%95%b0%e6%8d%ae%e5%ba%93
     * @see connection-options https://typeorm.devjs.cn/connection-options
     */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: configService.get('DB_MYSQL_USERNAME'),
        password: configService.get('DB_MYSQL_PASSWORD'),
        database: configService.get('DB_MYSQL_DATABASE'),
        retryDelay: 500, // 重试次数间隔
        retryAttempts: 5, // 重试次数
        autoLoadEntities: true, // 自动加载实体
        synchronize: false // 是否将实体同步到数据库 不能用在生产环境
      })
    }),
    /**
     * 静态文件访问模块
     *
     * @see serve-static https://github.com/nestjs/serve-static
     */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..') // 静态文件根路径
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development'
    }),
    UserModule,
    EmailModule,
    LocationModule,
    JwtModule,
    FriendModule
  ],
  controllers: [AppController],
  /**
   * 异常过滤器
   *
   * @see 异常过滤器 http://nestjs.inode.club/exception-filters
   */
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: CustomExceptionFilter
    // },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ]
})
export class AppModule implements NestModule {
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
       */
      .exclude(
        { path: '/user/login/email', method: RequestMethod.POST },
        { path: '/email/send', method: RequestMethod.POST }
      )
      /**
       * 注册到所有的 post 路由路由
       */
      .forRoutes({ path: '*', method: RequestMethod.POST })
  }
}
