import { IsNotEmpty, IsString } from 'class-validator'

export class GetUserRouteDetailDTO {
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