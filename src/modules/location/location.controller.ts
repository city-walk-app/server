import { Controller, Body, Post, Req } from '@nestjs/common'
import { LocationService } from './location.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import {
  CreatePositionRecordDto,
  GetUserRouteDetailDto,
  UpdateUserRouteDetailDto,
  GetUserRouteListDto,
  GetUserProvinceJigsawDto,
  GetUserMonthHeatmapDto,
  GetAroundAddressDto
} from './dto'

/**
 * 邮件相关接口列表
 */
@Controller('location')
@ApiTags('位置服务')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: '创建当前位置记录（打卡地点）' })
  @ApiParam({ name: 'longitude', description: '经度', required: true })
  @ApiParam({ name: 'latitude', description: '纬度', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 创建当前位置记录，打卡当前位置
   *
   * 这个接口应该是整个项目最重要的一个接口，因为整个项目就是围绕着打卡来的
   *
   * 这个接口应该做好充足的校验，比如：用户使用非法途径改变当前定位、挂VPN、使用第三方软件更改位置信息
   *
   * 这里一定要验证位置的合法性
   *
   * @param req 请求
   * @param body 请求参数
   */
  @Post('/create/record')
  createPositionRecord(
    @Req() req: Request,
    @Body() body: CreatePositionRecordDto
  ) {
    const { user_id } = req[USER_INFO]

    console.log(req.headers['user-agent'])

    return this.locationService.createPositionRecord(user_id, body)
  }

  @ApiOperation({ summary: '获取用户解锁的省份版图列表' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户解锁的省份版图列表
   *
   * @param req 请求
   * @param body 请求参数
   */
  @Post('/get/user/province/jigsaw')
  getUserProvinceJigsaw(@Body() body: GetUserProvinceJigsawDto) {
    return this.locationService.getUserProvinceJigsaw(body.user_id)
  }

  @ApiOperation({ summary: '获取用户步行记录详情' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: true })
  @ApiParam({ name: 'list_id', description: '列表 id', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户步行记录详情
   *
   * @param body 请求参数
   */
  @Post('/get/user/route/detail')
  getUserRouteDetail(@Body() body: GetUserRouteDetailDto) {
    return this.locationService.getUserRouteDetail(body.user_id, body.list_id)
  }

  @ApiOperation({ summary: '完善步行打卡记录详情' })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 完善步行打卡记录详情
   *
   * @param req 请求
   * @param body 请求参数
   */
  @Post('/update/user/route/detail')
  updateRouteDetail(
    @Req() req: Request,
    @Body() body: UpdateUserRouteDetailDto
  ) {
    const { user_id } = req[USER_INFO]

    return this.locationService.updateRouteDetail(user_id, body)
  }

  @ApiOperation({ summary: '获取用户指定月份打卡热力图' })
  @ApiParam({ name: 'year', description: '年份', required: false })
  @ApiParam({ name: 'month', description: '月份', required: false })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户指定月份打卡热力图
   *
   * @param req 请求
   * @param body 请求参数
   */
  @Post('/get/user/heatmap')
  getUserMonthHeatmap(@Body() body: GetUserMonthHeatmapDto) {
    let date = ''

    const { user_id, year, month } = body

    if (month && year) {
      date = year + '-' + month + '-' + '1'
    }

    return this.locationService.getUserMonthHeatmap(user_id, date)
  }

  @ApiOperation({ summary: '获取用户步行记录列表' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: true })
  @ApiParam({ name: 'year', description: '年份', required: false })
  @ApiParam({ name: 'month', description: '月份', required: false })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户步行记录列表
   *
   * @param body 请求参数
   */
  @Post('/get/user/route/list')
  getUserRouteList(@Body() body: GetUserRouteListDto) {
    let date = ''

    const { user_id, year, month } = body

    if (month && year) {
      date = year + '-' + month + '-' + '1'
    }

    return this.locationService.getUserRouteList(user_id, date)
  }

  @ApiOperation({ summary: '获取用户步行历史记录' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: true })
  @ApiParam({ name: 'year', description: '年份', required: false })
  @ApiParam({ name: 'month', description: '月份', required: false })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户步行历史记录
   *
   * @param body 请求参数
   */
  @Post('/get/user/route/history')
  getUserRouteHistory(@Body() body: GetUserRouteListDto) {
    let date = ''

    const { user_id, year, month } = body

    if (month && year) {
      date = year + '-' + month + '-' + '1'
    }

    return this.locationService.getUserRouteHistory(user_id, date)
  }

  @ApiOperation({ summary: '获取当前地区的天气' })
  @ApiParam({ name: 'longitude', description: '经度', required: true })
  @ApiParam({ name: 'latitude', description: '纬度', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取当前地区的天气
   *
   * @param body 请求参数
   */
  @Post('/get/weather/info')
  getWeatherInfo(@Body() body: CreatePositionRecordDto) {
    const { latitude, longitude } = body

    return this.locationService.getWeatherInfo(longitude, latitude)
  }

  @ApiOperation({ summary: '获取周边地址' })
  @ApiParam({ name: 'longitude', description: '经度', required: true })
  @ApiParam({ name: 'latitude', description: '纬度', required: true })
  @ApiParam({ name: 'page_num', description: '页码', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取周边地址
   *
   * @param body 请求桉树
   */
  @Post('/get/around/address')
  getAroundAddress(@Body() body: GetAroundAddressDto) {
    const { latitude, longitude, page_num } = body

    return this.locationService.getAroundAddress(longitude, latitude, page_num)
  }

  @ApiOperation({ summary: '获取今天的打卡记录' })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取今天的打卡记录
   *
   * @param req 请求
   */
  @Post('/get/today/record')
  getTodayRecord(@Req() req: Request) {
    const { user_id } = req[USER_INFO]

    return this.locationService.getTodayRecord(user_id)
  }
}
