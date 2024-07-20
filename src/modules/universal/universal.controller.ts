import { Controller, Post } from '@nestjs/common'
import { UniversalService } from './universal.service'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 基本的接口列表
 */
@Controller('universal')
@ApiTags('基本的')
export class UniversalController {
  /**
   * @param universalService 基本服务
   */
  constructor(private readonly universalService: UniversalService) {}

  @ApiOperation({ summary: '上传公开文件' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 上传公开文件
   */
  @Post('/content/upload')
  contentUpload() {
    return this.universalService.contentUpload()
  }
}
