import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { HttpCode } from 'src/enum'
import { Result } from 'src/utils'

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
    // const request = ctx.getRequest()
    // const status = exception instanceof HttpException
    //   ? exception.getStatus()
    //   : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception.message || '服务错误'

    if (process.env.NODE_ENV === 'development') {
      console.error('全局错误拦截：', exception)
    }

    response.status(HttpCode.OK).json(new Result(HttpCode.ERR, message))
  }
}
