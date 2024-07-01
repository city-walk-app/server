import { IsString, IsNotEmpty } from 'class-validator'

export class GetUserInfoDTO {
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
  user_id: string
}
