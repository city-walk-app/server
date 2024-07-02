import { IsString, IsNotEmpty } from 'class-validator'

/**
 * 获取用户信息参数校验规则
 */
export class GetUserInfoDTO {
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
  user_id: string
}
