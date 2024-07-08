import { Controller, Body, Post, Req } from '@nestjs/common'
import { LocationService } from './location.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { Result } from 'src/utils'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import {
  GetPopularRecommendsDTO,
  CreatePositionRecordDTO,
  GetUserRouteDetailDTO
} from './dto'

/**
 * 邮件相关接口列表
 */
@Controller('location')
@ApiTags('位置服务')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: '获取周边热门地点推荐' })
  @ApiParam({ name: 'longitude', description: '经度', required: true })
  @ApiParam({ name: 'latitude', description: '纬度', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取周边热门地点
   *
   * @param query 请求参数
   */
  @Post('/get/popular/recommend')
  getPopularRecommends(@Body() body: GetPopularRecommendsDTO) {
    const { latitude, longitude } = body

    return this.locationService.getPopularRecommends(longitude, latitude)
  }

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
   * @param body 请求参数
   * @param headers 请求头
   */
  @Post('/create/record')
  createPositionRecord(
    @Req() req: Request,
    @Body() body: CreatePositionRecordDTO
  ) {
    const { user_id } = req[USER_INFO]

    console.log(req.headers['user-agent'])

    return this.locationService.createPositionRecord(user_id, body)
  }

  @ApiOperation({ summary: '获取用户解锁的省份版图列表' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: false })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户解锁的省份版图列表
   *
   * @param req 请求
   * @param query 参数
   */
  @Post('/get/user/province/jigsaw')
  getUserProvinceJigsaw(
    @Req() req: Request,
    @Body() body: { user_id?: string }
  ) {
    const { user_id } = req[USER_INFO]

    return this.locationService.getUserProvinceJigsaw(body.user_id || user_id)
  }

  @ApiOperation({ summary: '获取用户步行记录列表' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: false })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户步行记录列表
   *
   * @param req 请求
   * @param body 参数
   */
  @Post('/get/user/route/list')
  async getUserRouteList(
    @Req() req: Request,
    @Body() body: { user_id?: string }
  ) {
    const { user_id } = req[USER_INFO]

    // console.log(req.headers['user-agent'])

    // const { ip } = await this.locationService.positioning(req)

    // if (ip === '127.0.0.1') {
    //   return new Result(HttpCode.ERR, '非法调用')
    // }

    // console.log(ip)

    return this.locationService.getUserRouteList(body.user_id || user_id)
  }

  @ApiOperation({ summary: '获取用户步行记录详情' })
  @ApiParam({ name: 'user_id', description: '用户 id', required: true })
  @ApiParam({ name: 'list_id', description: '列表 id', required: true })
  @ApiResponse({ status: HttpCode.OK, description: '成功' })
  /**
   * 获取用户步行记录详情
   *
   * @param body 参数
   */
  @Post('/get/user/route/detail')
  getUserRouteDetail(@Body() body: GetUserRouteDetailDTO) {
    return this.locationService.getUserRouteDetail(body.user_id, body.list_id)
  }
}
