import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Logger } from 'src/common'



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
      const logger = new Logger()

      logger.log(`全局管道拦截错误：${msg}`)

      throw new BadRequestException(msg)
    }

    return value
  }
}
