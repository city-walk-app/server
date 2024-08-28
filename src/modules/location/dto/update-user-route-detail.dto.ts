import { TravelType, MoodColor } from 'src/enum'
import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator'
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
  mood_color?: MoodColor

  /**
   * 地址信息
   */
  @ApiProperty()
  address?: string

  /**
   * 照片
   */
  @ApiProperty()
  picture?: string[]

  /**
   * 经度
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'longitude 必须是字符串类型' })
  @Matches(/^-?\d+(\.\d+)?$/, {
    message: 'longitude 必须是有效的经度值'
  })
  longitude?: string

  /**
   * 纬度
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'latitude 必须是字符串类型' })
  @Matches(/^-?\d+(\.\d+)?$/, {
    message: 'latitude 必须是有效的纬度值'
  })
  latitude?: string
}
