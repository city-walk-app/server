import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取用户指定月份打卡热力图
 */
export class GetUserMonthHeatmapDto {
  /**
   * 日期
   */
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
  @ApiProperty()
  date: string
}
