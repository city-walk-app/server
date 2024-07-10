import {
  IsEmail,
  IsNotEmpty,
  MaxLength
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 发送获取邮箱验证码
 */
export class SendEmailCodeDto {
  /**
   * 邮箱
   */
  @MaxLength(254)
  @IsNotEmpty({ message: '邮箱缺失' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty()
  email: string
}