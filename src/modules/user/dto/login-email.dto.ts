import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  MaxLength
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 邮箱登录参数校验规则
 */
export class LoginEmailDto {
  /**
   * 邮箱
   */
  @MaxLength(254)
  @IsNotEmpty({ message: '邮箱缺失' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty()
  email: string

  /**
   * 邮箱验证码
   */
  @IsNotEmpty({ message: '验证码缺失' })
  @IsString({ message: '验证码必须是字符串' })
  @Length(6, 6, { message: '验证码长度不正确' })
  @ApiProperty()
  code: string
}
