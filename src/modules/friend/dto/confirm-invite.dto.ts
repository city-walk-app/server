import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 同意好友申请
 */
export class ConfirmInviteDto {
  /**
   * 邀请 id
   */
  @IsNotEmpty({ message: '参数缺失' })
  @IsString({ message: '类型错误' })
  @ApiProperty()
  invite_id: string
}
