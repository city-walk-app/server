import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { LoggerService } from 'src/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const loggerService = new LoggerService()

  app.useLogger(loggerService)

  // 允许跨域
  if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  }

  /**
   * Swagger 配置
   *
   * @see swagger https://www.npmjs.com/package/@nestjs/swagger
   * @see swagger-ui https://github.com/swagger-api/swagger-ui
   * @see Introduction https://docs.nestjs.com/openapi/introduction
   */
  const config = new DocumentBuilder()
    .setTitle('City Walk 接口文档')
    .setDescription('城市漫步 City Walk')
    .setVersion('1.0')
    .build()

  /** swagger 配置项 */
  const customOptions = {
    swaggerOptions: {
      docExpansion: 'none' // 节展开的默认状态
    }
  }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document, customOptions)

  await app.init()

  await app.listen(1219, '0.0.0.0', () => {
    console.log(process.env.NODE_ENV === 'production'
      ? '生产环境端口 1219 已经启动'
      : '开发环境 1219 端口已经启动')
  })
}
bootstrap()
