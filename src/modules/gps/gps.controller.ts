import { Controller, Get, Query, Req, Post, Body } from '@nestjs/common'
import { GpsService } from './gps.service'
import { Request } from 'express'
import { HttpCode, USER_INFO } from 'src/enum'
import * as requestIp from 'request-ip'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import type { UserRoute } from './entity'

/**
 * 定位相关接口类别
 */
@Controller('gps')
@ApiTags('定位')
export class GpsController {
  /**
   * @param gpsService 定位服务
   * @param experienceService 经验服务
   */
  constructor(private readonly gpsService: GpsService) {}

  @ApiOperation({ summary: '获取 ip' })
  /**
   * 获取 ip
   *
   * @param request 请求传参数
   */
  @Get('/positioning')
  positioning(@Req() request: Request) {
    const ip: string = requestIp.getClientIp(request)

    if (ip) {
      return this.gpsService.positioning(ip)
    }
  }

  @ApiOperation({ summary: '获取指定用户去过的省份' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  @ApiParam({ name: 'id', description: '用户 id', required: false })
  /**
   * 获取指定用户去过的省份
   *
   * @param id 用户 id
   */
  @Get('/get_user_province')
  getUserProvinceChinaMap(
    @Req() req: Request,
    @Query() query: { user_id?: string }
  ) {
    const { user_id } = req[USER_INFO]

    return this.gpsService.getUserProvince(query.user_id || user_id)
  }

  @ApiOperation({ summary: '创建当前位置记录' })
  /**
   * 创建当前位置记录，打卡当前位置
   *
   * @param body 请求参数
   * @param headers 请求头
   */
  @Post('/create_position_record')
  createPositionRecord(@Req() req: Request, @Body() body: UserRoute) {
    const { user_id } = req[USER_INFO]

    return this.gpsService.createPositionRecord(user_id, body)
  }

  @ApiOperation({ summary: '获取用户当天发布位置记录' })
  /**
   * 获取用户当天发布位置记录
   *
   * @param headers 请求头
   */
  @Get('/get_route')
  getRoute(@Req() req: Request) {
    const { user_id } = req[USER_INFO]

    return this.gpsService.getRoute(user_id)
  }

  @ApiOperation({ summary: '获取指定步行记录历史打卡记录列表' })
  @ApiParam({ name: 'id', description: '列表 id', required: false })
  /**
   * 获取地点历史打卡记录
   *
   * @param headers 请求头
   * @param query 请求参数
   */
  @Get('/get_route_history')
  getRouteHistory(@Req() req: Request, @Query() query: { id: number }) {
    const { user_id } = req[USER_INFO]

    return this.gpsService.getRouteHistory(user_id, query.id)
  }

  @ApiOperation({ summary: '获取用户步行记录列表' })
  @ApiParam({ name: 'page', description: '页码', required: true })
  @ApiParam({ name: 'page_size', description: '每页大小', required: true })
  /**
   * 获取用户步行记录
   *
   * @param headers 请求头
   */
  @Get('/get_route_list')
  getRouteList(
    @Req() req: Request,
    @Query() query: { page: number; page_size: number }
  ) {
    const { user_id } = req[USER_INFO]
    const { page, page_size } = query

    return this.gpsService.getRouteList(user_id, page, page_size)
  }

  @ApiOperation({ summary: '通过经纬度获取位置信息' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  @ApiParam({ name: 'longitude', description: '经度', required: true })
  @ApiParam({ name: 'latitude', description: '纬度', required: true })
  /**
   * 通过经纬度获取位置信息
   *
   * @param headers 请求头信息
   * @param query 经纬度信息
   * @param query.longitude 经度
   * @param query.latitude 纬度
   */
  @Get('/get_location_info')
  getLocationInfo(
    @Req() req: Request,
    @Query() query: { longitude: number; latitude: number }
  ) {
    const { user_id } = req[USER_INFO]

    return this.gpsService.getLocationInfo(
      query.longitude,
      query.latitude,
      user_id
    )
  }

  @ApiOperation({ summary: '获取地图数据' })
  @ApiParam({ name: 'code', description: '经度', required: false })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取地图数据
   */
  @Get('/get_map_data')
  getMapData(@Query() query: { code?: number }) {
    return this.gpsService.getMapData(query.code)
  }

  @ApiOperation({ summary: '获取用户历史所有打开记录' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取用户历史所有打开记录
   *
   * @param headers 请求头
   */
  @Get('/get/router/history/all')
  getRouterHistory(@Req() req: Request) {
    const { user_id } = req[USER_INFO]

    return this.gpsService.getRouterHistory(user_id)
  }

  @ApiOperation({ summary: '获取周边热门地点' })
  @ApiResponse({ status: HttpCode.OK, description: '获取成功' })
  /**
   * 获取周边热门地点
   *
   * @param query 请求参数
   */
  @Get('/get/popular/locations')
  getPopularLocations(@Query() query: { longitude: number; latitude: number }) {
    const { latitude, longitude } = query

    return this.gpsService.getPopularLocations(longitude, latitude)
  }
}
