import { Controller, Body, Post, Get, Query } from '@nestjs/common'
import { LocationService } from './location.service'
import { EmailService } from '../email/email.service'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { GetPopularRecommendsDTO } from './dto'

/**
 * 邮件相关接口列表
 */
@Controller('location')
@ApiTags('位置服务')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: '获取周边热门地点推荐' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取周边热门地点
   *
   * @param query 请求参数
   */
  @Get('/get/popular/recommend')
  getPopularRecommends(@Query() query: GetPopularRecommendsDTO) {
    const { latitude, longitude } = query

    return this.locationService.getPopularRecommends(longitude, latitude)
  }
}
