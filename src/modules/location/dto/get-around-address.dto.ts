import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取周边地址
 */
export class GetAroundAddressDto {
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

  /**
   * 页码
   */
  @IsNotEmpty({ message: 'page_num 参数缺失' })
  @ApiProperty()
  page_num: number
}
