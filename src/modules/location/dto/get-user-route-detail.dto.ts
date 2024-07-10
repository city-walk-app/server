import { IsNotEmpty, IsString } from 'class-validator'

/**
 * 获取用户步行记录详情
 */
export class GetUserRouteDetailDto {
  /**
   * 用户 id
   */
  @IsString({ message: '参数类型错误' })
  @IsNotEmpty({ message: '用户 id 参数缺失' })
  user_id: string

  /**
   * 列表 id
   */
  @IsString({ message: '参数类型错误' })
  @IsNotEmpty({ message: '列表 id 参数缺失' })
  list_id: string
}
