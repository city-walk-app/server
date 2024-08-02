import { IsNotEmpty, IsString, Matches } from 'class-validator'
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
   * 日期
   */
  // @IsNotEmpty({ message: '参数缺失' })
  // @IsString({ message: '类型错误' })
  // @Matches(/^\d{4}-\d{2}-\d{2}$/, {
  //   message: '日期格式错误，应为 yyyy-mm-dd'
  // })
  @ApiProperty()
  date?: string
}
