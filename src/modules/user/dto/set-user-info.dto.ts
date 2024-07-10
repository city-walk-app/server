import {
  IsString,
  IsOptional,
  Matches,
  Length,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions
} from 'class-validator'
import { SensitiveWord } from 'src/utils'
import { ApiProperty } from '@nestjs/swagger'

const sensitiveWordChecker = SensitiveWord.instance

@ValidatorConstraint({ async: false })
export class IsHaveSensitiveConstraint implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    const res = sensitiveWordChecker.validater(text)

    return !res
  }
}

/**
 * 检查是否包含敏感词
 *
 * @param validationOptions
 */
export const IsHaveSensitive = (validationOptions?: ValidationOptions) => {
  return (object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHaveSensitiveConstraint
    })
  }
}

/**
 * 设置用户信息参数校验规则
 */
export class SetUserInfoDto {
  /**
   * 手机号
   */
  @IsOptional()
  @IsString()
  @Matches(/^[1][3-9][0-9]{9}$/, { message: '手机号格式不正确' })
  @ApiProperty()
  mobile?: string

  /**
   * 昵称
   */
  @IsOptional()
  @IsString()
  @IsHaveSensitive({ message: '昵称包含敏感词' }) // 使用自定义校验器
  @Length(1, 16, { message: '昵称长度不规范' })
  @ApiProperty()
  nick_name?: string

  /**
   * 个性签名
   */
  @IsOptional()
  @IsString()
  @IsHaveSensitive({ message: '签名包含敏感词' }) // 使用自定义校验器
  @Length(1, 30, { message: '签名长度不规范' })
  @ApiProperty()
  signature?: string

  /**
   * 省份
   */
  @IsOptional()
  @IsString()
  @ApiProperty()
  province?: string

  /**
   * 城市
   */
  @IsOptional()
  @IsString()
  @ApiProperty()
  city?: string

  /**
   * 生日
   */
  @IsOptional()
  @IsString()
  @ApiProperty()
  birthday?: string

  /**
   * 性别
   */
  @IsOptional()
  @IsString()
  @ApiProperty()
  gender?: string
}
