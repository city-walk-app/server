import { TravelType } from 'src/enum'
import { IsString } from 'class-validator'

/**
 * 完善步行打卡记录详情
 */
export class UpdateUserRouteDetailDto {
  /**
   * 内容
   */
  @IsString()
  content?: string

  /**
   * 出行方式
   */
  @IsString()
  travel_type?: TravelType

  /**
   * 心情颜色
   */
  @IsString()
  mood_color?: string
}