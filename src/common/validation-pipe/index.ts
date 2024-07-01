import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'

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

      return new Result(HttpCode.ERR, msg)
    }

    return value
  }
}
