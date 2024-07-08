import { IsNotEmpty } from 'class-validator'

export class GetPopularRecommendsDTO {
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
