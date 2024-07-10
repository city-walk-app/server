import { IsNotEmpty } from 'class-validator'

/**
 * 创建当前位置记录，打卡当前位置
 */
export class CreatePositionRecordDto {
  /**
   * 经度
   */
  @IsNotEmpty({ message: 'longitude 参数缺失' })
  longitude: number

  /**
   * 纬度
   */
  @IsNotEmpty({ message: 'latitude 参数缺失' })
  latitude: number
}
