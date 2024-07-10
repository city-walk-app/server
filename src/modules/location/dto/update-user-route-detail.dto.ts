import { TravelType } from 'src/enum'
import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 完善步行打卡记录详情
 */
export class UpdateUserRouteDetailDto {
  /**
   * 步行 id
   */
  @IsNotEmpty({ message: 'route_id 参数缺失' })
  @IsString({ message: 'route_id 参数类型错误' })
  @ApiProperty()
  route_id: string

  /**
   * 内容
   */
  @ApiProperty()
  content?: string

  /**
   * 出行方式
   */
  @ApiProperty()
  travel_type?: TravelType

  /**
   * 心情颜色
   */
  @ApiProperty()
  mood_color?: string
}