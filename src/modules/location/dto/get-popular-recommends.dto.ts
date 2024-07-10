import { IsNotEmpty } from 'class-validator'

/**
 * 获取周边热门地点
 */
export class GetPopularRecommendsDto {
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
