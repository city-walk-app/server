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

    if (process.env.NODE_ENV === 'development') {
      console.error('全局错误拦截：' + exception.message)
    }

    response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message || '服务器内部错误',
      code: exception ? HttpCode.ERR : HttpCode.INTERNAL_SERVER_ERROR
    })
  }
}
