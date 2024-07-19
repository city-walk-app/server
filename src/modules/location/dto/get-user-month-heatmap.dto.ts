import { IsNotEmpty, IsString, Matches } from 'class-validator'
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
  @Matches(/^\d{4}-\d{2}$/, { message: '日期格式错误，正确格式为 yyyy-mm' })
  @ApiProperty()
  date: string
}
