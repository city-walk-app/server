import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 获取用户步行记录列表
 */
export class GetUserRouteListDto {
  /**
   * 用户 id
   */
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
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
