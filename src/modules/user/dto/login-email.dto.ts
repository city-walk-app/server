import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator'

export class LoginEmailDTO {
  @IsNotEmpty({ message: '邮箱缺失' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string

  @IsNotEmpty({ message: '验证码缺失' })
  @IsString({ message: '验证码必须是字符串' })
  @Length(6, 6, { message: '验证码长度不正确' })
  code: string
}
