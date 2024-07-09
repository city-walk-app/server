import { Injectable, ExecutionContext } from '@nestjs/common'
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(context: ExecutionContext): Promise<void> {
    throw new ThrottlerException('自定义错误信息：请求过于频繁，请稍后再试。')
  }
}
