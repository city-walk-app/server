import { TravelType } from 'src/enum'
import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 完善步行打卡记录详情
 */
export class UpdateUserRouteDetailDto {
  /**
   * 内容
   */
  @IsString()
  @ApiProperty()
  content?: string

  /**
   * 出行方式
   */
  @IsString()
  @ApiProperty()
  travel_type?: TravelType

  /**
   * 心情颜色
   */
  @IsString()
  @ApiProperty()
  mood_color?: string
}