import { Controller, Body, Post, Get, Query, Req } from '@nestjs/common'
import { LocationService } from './location.service'
// import { EmailService } from '../email/email.service'
// import { Result } from 'src/utils'
import { HttpCode, USER_INFO } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { GetPopularRecommendsDTO, CreatePositionRecordDTO } from './dto'

/**
 * 邮件相关接口列表
 */
@Controller('location')
@ApiTags('位置服务')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

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

  @ApiOperation({ summary: '创建当前位置记录（打卡地点）' })
  @ApiParam({ name: 'longitude', description: '经度', required: true })
  @ApiParam({ name: 'latitude', description: '纬度', required: true })
  /**
   * 创建当前位置记录，打卡当前位置
   *
   * 这个接口应该是整个项目最重要的一个接口，因为整个项目就是围绕着打卡来的
   *
   * 这个接口应该做好充足的校验，比如：用户使用非法途径改变当前定位、挂VPN、使用第三方软件更改位置信息
   *
   * 这里一定要验证位置的合法性
   *
   * @param body 请求参数
   * @param headers 请求头
   */
  @Post('/create/record')
  createPositionRecord(
    @Req() req: Request,
    @Body() body: CreatePositionRecordDTO
  ) {
    const { user_id } = req[USER_INFO]

    return this.locationService.createPositionRecord(user_id, body)
  }

  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: false })
  /**
   * 获取用户解锁的省份版图列表
   * 
   * @param req 请求
   * @param query 参数
   */
  @Get('/get/user/province/jigsaw')
  getUserProvinceJigsaw(@Req() req: Request, @Query() query: { user_id?: string }) {
    const { user_id } = req[USER_INFO]

    return this.locationService.getUserProvinceJigsaw(query.user_id || user_id)
  }
}
