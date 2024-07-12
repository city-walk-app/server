import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * open id 登录
 */
export class LoginOpenIdDto {
  /**
   * open id
   */
  @IsNotEmpty({ message: 'open id 缺失' })
  @IsString({ message: 'open id 必须是字符串' })
  @ApiProperty()
  wx_open_id: string
}
