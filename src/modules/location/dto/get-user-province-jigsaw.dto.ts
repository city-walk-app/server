import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取用户解锁的省份版图列表
 */
export class GetUserProvinceJigsawDto {
  /**
  * 用户 id
  */
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
  @ApiProperty()
  user_id: string
}