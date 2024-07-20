import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * 上传公开文件
 */
export class ContentUploadDto {
  /**
   * 文件名称
   */
  // @IsNotEmpty({ message: '参数缺失' })
  // @IsString({ message: '类型错误' })
  // @ApiProperty()
  file_name: string
}
