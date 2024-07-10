import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取用户信息参数校验规则
 */
export class GetUserInfoDto {
  /**
   * 用户 id
   */
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
  @ApiProperty()
  user_id: string
}
