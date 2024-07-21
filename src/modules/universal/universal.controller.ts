import { Controller, Post, Body } from '@nestjs/common'
import { UniversalService } from './universal.service'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ContentUploadDto } from './dto'

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
  contentUpload(@Body() body: ContentUploadDto) {
    return this.universalService.contentUpload(body)
  }
}
