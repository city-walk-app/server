import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express'
// import * as fs from 'fs'
// import * as https from 'https'
// import { corsMiddleware } from './middleware'
// import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const server = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server))

  // app.use(corsMiddleware)

  // 允许跨域
  if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  }

  // 为每个HTTP路由路径注册一个前缀
  // app.setGlobalPrefix('/api')

  // app.useGlobalPipes(new ValidationPipe({
  //   transform: true,
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   forbidUnknownValues: true,
  //   validationError: { target: false, value: false },
  // }))

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

  // 生产环境
  if (process.env.NODE_ENV === 'production') {
    // const httpsOptions = {
    //   key: fs.readFileSync('/home/project/city-walk-end/ssl/city-walk.top.key'),
    //   cert: fs.readFileSync('/home/project/city-walk-end/ssl/city-walk.top.pem')
    // }

    // const httpsServer = await https.createServer(httpsOptions, server)

    await app.init()
    // await httpsServer.listen(1219, '0.0.0.0', () => {
    //   console.log('生产环境端口 1219 已经启动')
    // })

    await app.listen(1219, '0.0.0.0', () => {
      console.log('生产环境端口 1219 已经启动')
    })
    return
  }

  // 开发环境
  await app.listen(1219, '0.0.0.0', () => {
    console.log('开发环境 1219 端口已经启动')
  })
}
bootstrap()
