import { Controller, Post, Body, Get, Req, Query } from '@nestjs/common'
import { ExperienceService } from './experience.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger'

/**
 * 省份经验相关接口
 */
@ApiTags('经验')
@Controller('experience')
export class ExperienceController {
  /**
   * @param experienceService 经验服务
   */
  constructor(private readonly experienceService: ExperienceService) {}

  @ApiOperation({ summary: '收集经验' })
  @ApiResponse({ status: HttpCode.OK, description: '收集成功' })
  @ApiParam({ name: 'id', description: '列表 id', required: false })
  /**
   * 收集经验
   *
   * @param body
   */
  @Post('/collect')
  collectExperience(@Req() req: Request, @Body() body: { id: number }) {
    const { user_id } = req[USER_INFO]

    return this.experienceService.collectExperience(body.id, user_id)
  }

  @ApiOperation({ summary: '获取经验值列表' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  @ApiParam({ name: 'province_code', description: '省份编码', required: true })
  /**
   * 获取经验值列表
   *
   * @param headers 请求头信息
   * @param query 请求参数
   * @param query.province_code 省份编码
   */
  @Get('/get_experience')
  getExperience(
    @Req() req: Request,
    @Query() query: { province_code: string }
  ) {
    const { user_id } = req[USER_INFO]

    return this.experienceService.getExperience(user_id, query.province_code)
  }

  @ApiOperation({ summary: '获取经验排行榜' })
  @ApiParam({ name: 'province_code', description: '省份编码', required: false })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  /**
   * 获取经验排行榜
   *
   * @param [province_code] 省份编码
   */
  @Get('/ranking')
  getRanking(@Query('province_code') province_code?: string) {
    return this.experienceService.getRanking(province_code)
  }
}
