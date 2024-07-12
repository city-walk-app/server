import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取 open id
 */
export class GetOpenIdDto {
  /**
   * code
   */
  @IsNotEmpty({ message: 'code 缺失' })
  @IsString({ message: 'code 必须是字符串' })
  @ApiProperty()
  code: string
}
