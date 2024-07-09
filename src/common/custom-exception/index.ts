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
      console.error('服务器内部错误', exception)
    }

    response.status(status).json({ message: '服务内部错误', code: HttpCode.INTERNAL_SERVER_ERROR })
  }
}
