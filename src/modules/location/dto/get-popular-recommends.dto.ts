import { IsNotEmpty, IsNumber } from 'class-validator'

export class GetPopularRecommendsDTO {
  /**
   * 经度
   */
  @IsNotEmpty({ message: 'longitude参数缺失' })
  @IsNumber({}, { message: 'longitude 参数类型错误' })
  longitude: number

  /**
   * 纬度
   */
  @IsNotEmpty({ message: 'latitude 参数缺失' })
  @IsNumber({}, { message: 'latitude 参数类型错误' })
  latitude: number
}