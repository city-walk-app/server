import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取用户指定月份打卡热力图
 */
export class GetUserMonthHeatmapDto {
  /**
   * 用户 id
   */
  @IsString({ message: '参数类型错误' })
  @IsNotEmpty({ message: '用户 id 参数缺失' })
  @ApiProperty()
  user_id: string

  /**
   * 年份
   */
  @ApiProperty()
  year?: string

  /**
   * 月份
   */
  @ApiProperty()
  month?: string
}
