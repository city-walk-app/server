import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value
    }
    const params = plainToClass(metatype, value)
    const errors = await validate(params)

    if (errors && errors.length) {
      const msg = Object.values(errors[0].constraints)[0]

      if (process.env.NODE_ENV === 'development') {
        console.error('全局管道错误拦截：' + msg)
      }

      throw new BadRequestException(msg)
    }

    return value
  }
}
