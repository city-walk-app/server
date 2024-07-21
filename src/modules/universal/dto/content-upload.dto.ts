import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 上传公开文件
 */
export class ContentUploadDto {
  /**
   * 后缀名
   */
  @IsNotEmpty({ message: '后缀名参数缺失' })
  @IsString({ message: '后缀名类型错误' })
  @ApiProperty()
  suffix: string
}
