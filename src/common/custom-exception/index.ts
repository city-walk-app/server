import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import { HttpCode } from 'src/enum'

/**
 * 异常过滤器
 *
 * @see 异常过滤器 http://nestjs.inode.club/exception-filters
 */

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest<Request>()

    // console.log('request:', request)
    // console.log('请求方法:', request.method)

    let status = HttpCode.INTERNAL_SERVER_ERROR
    let message = '服务器内部错误'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.message
    }

    response.status(status).json({ message, code: status })
  }
}
