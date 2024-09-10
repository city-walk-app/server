import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 创建当前位置记录，打卡当前位置
 */
export class CreatePositionRecordDto {
  /**
   * 经度
   */
  @IsNotEmpty({ message: 'longitude 参数缺失' })
  @ApiProperty()
  longitude: string

  /**
   * 纬度
   */
  @IsNotEmpty({ message: 'latitude 参数缺失' })
  @ApiProperty()
  latitude: string
}
