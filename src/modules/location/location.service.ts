import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result, renderID } from 'src/utils'
import { HttpCode, AMap, PrefixID, CITY_NAME_CODE } from 'src/enum'
import { ConfigService } from '@nestjs/config'
import { CreatePositionRecordDTO, GetUserRouteDetailDTO } from './dto'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import { HttpService } from '@nestjs/axios'
import { LoggerService } from 'src/common'

@Injectable()
export class LocationService {
  /** 高德地图密钥 */
  private apiKey: string

  /**
   * @param httpService 日志服务
   * @param httpService 请求服务
   * @param configService 配置服务
   * @param userVisitedProvinceEntity 用户访问的省份数据库
   * @param userRouteEntity 用户步行地址信息详情
   * @param userRouteListEntity 用户步行地址信息详情列表
   */
  constructor(
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(UserVisitedProvince)
    private readonly userVisitedProvinceEntity: Repository<UserVisitedProvince>,
    @InjectRepository(UserRoute)
    private readonly userRouteEntity: Repository<UserRoute>,
    @InjectRepository(UserRouteList)
    private readonly userRouteListEntity: Repository<UserRouteList>
  ) {
    this.apiKey = this.configService.get('DB_MAP_API_KEY')
  }

  /**
   * 通过 ip 定位
   *
   * @param request 请求
   */
  // async positioning(request: Request) {
  //   const ip: string = requestIp.getClientIp(request)

  //   const response = await this.httpService.axiosRef.get(AMap.ip, {
  //     params: {
  //       key: this.apiKey,
  //       ip
  //     }
  //   })
  //   return { ip, response }
  // }

  /**
   * 获取周边热门地点
   *
   * @param longitude 经度
   * @param latitude 纬度
   */
  async getPopularRecommends(longitude: number, latitude: number) {
    const response = await this.httpService.axiosRef.get(AMap.place_around, {
      params: {
        key: this.apiKey,
        location: `${longitude},${latitude}`,
        radius: 5000,
        types:
          '110000|110100|110101|110102|110103|110104|110105|110106|110200|110201|110202|110203|110204|110205|110206|110207|110208|110209|110210',
        page_size: 25
      }
    })

    if (
      response.data.status === '1' &&
      response.data.pois &&
      response.data.pois.length
    ) {
      const data = response.data.pois.map((item) => {
        const [longitude, latitude] = item.location.split(',')

        return {
          longitude: Number(longitude),
          latitude: Number(latitude),
          name: item.name,
          province: item.pname, // 省
          city: item.cityname // 城市
        }
      })

      return new Result(HttpCode.OK, 'ok', data)
    }

    return new Result(HttpCode.OK, '暂无推荐地点', [])
  }

  /**
   * 获取用户解锁的省份版图列表
   *
   * @param user_id 用户 id
   */
  async getUserProvinceJigsaw(user_id: string) {
    const data = await this.userVisitedProvinceEntity.find({
      where: { user_id },
      select: ['experience_value', 'province_code', 'province_name', 'vis_id']
    })

    this.loggerService.log('获取用户解锁的省份版图列表：' + JSON.stringify(data))

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 获取用户步行记录列表
   *
   * @param user_id 用户 id
   */
  async getUserRouteList(user_id: string) {
    const data = await this.userRouteListEntity.findBy({ user_id })

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 获取用户步行记录详情
   *
   * @param user_id 用户 id
   * @param list_id 列表 id
   */
  async getUserRouteDetail(
    user_id: GetUserRouteDetailDTO['user_id'],
    list_id: GetUserRouteDetailDTO['list_id']
  ) {
    const data = await this.userRouteEntity.findBy({ user_id, list_id })

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 创建当前位置记录，打卡当前位置
   *
   * @param user_id 用户 id
   * @param body 请求参数
   */
  async createPositionRecord(user_id: string, body: CreatePositionRecordDTO) {
    const { longitude, latitude } = body

    /**
     * 通过经纬度调用高德地图 API 获取当前的位置信息
     */
    const locationInfo = await this.getLocationInfo(longitude, latitude)

    // 避免高德地图接口响应错误
    if (
      !locationInfo ||
      locationInfo.status !== '1' ||
      !locationInfo.regeocode.addressComponent
    ) {
      return new Result(HttpCode.ERR, '获取位置错误')
    }

    const { adcode, province, city } = locationInfo.regeocode.addressComponent

    this.loggerService.log('创建当前位置记录，打卡当前位置，高的地图返回：' + JSON.stringify(locationInfo.regeocode.addressComponent))

    /** 格式化后的省份编码 */
    const province_code = `${adcode}`.slice(0, 2) + '0000'

    // 如果数组中不存在格式化后的数组，则说明编码不正确，提前拦截
    if (!(province_code in CITY_NAME_CODE)) {
      return new Result(HttpCode.ERR, '无效省份编码')
    }

    /**
     * 通过用户 id 和省份 code 获取到当前用户所获的的当前省份的累积经验值
     *
     * 也可以作为是否为新省份的标识，如果没有获取到，则说明当前用户还没有在当前省份获取到过经验值，也就是未解锁
     */
    let provinceExperience: UserVisitedProvince | null =
      await this.userVisitedProvinceEntity.findOneBy({
        user_id,
        province_code
      })

    // 判断当前省份经验值是否存在，如果存在则使用，不存在就创建一条新的
    if (!provinceExperience) {
      const newProvinceExperience = new UserVisitedProvince()

      newProvinceExperience.user_id = user_id
      newProvinceExperience.province_code = province_code
      newProvinceExperience.province_name = province
      newProvinceExperience.vis_id = renderID(PrefixID.vis)
      /**
       * 待优化，经验值应该设置个枚举
       */
      newProvinceExperience.experience_value = 20

      const result = await this.userVisitedProvinceEntity.save(
        newProvinceExperience
      )

      // 避免上一步创建失败
      if (!result) {
        return new Result(HttpCode.ERR, '创建新的省份错误')
      }

      provinceExperience = result
    } else {
      /**
       * 最新的经验值
       *
       * 待优化
       */
      const experience_value = Number(provinceExperience.experience_value) + 20

      provinceExperience.experience_value = experience_value

      const res = await this.userVisitedProvinceEntity.save(provinceExperience)

      // 避免上一步创建失败
      if (!res) {
        return new Result(HttpCode.ERR, '增加经验值错误')
      }
    }

    // 创建步行记录
    const createRouteListRes = await this.createRouteList(user_id)

    /**
     * 创建新的打卡地点详情
     */
    const createRouteRes = await this.createRoute({
      list_id: createRouteListRes.list_id,
      user_id,
      longitude,
      latitude,
      province_code,
      province: `${province}` || '未知省份',
      city: `${city}` || '未知城市',
      create_at: new Date(),
      address: '',
      name: ''
    })

    this.loggerService.log('创建新的打卡地点详情：' + createRouteRes)

    return new Result(HttpCode.OK, 'ok', {
      /**
       * 是否为中国大陆
       *
       * 判断当前位置的省份编码是否存在
       */
      is_in_china: !!(adcode && adcode.length),
      /**
       * 是否为新省份
       */
      is_new_province: !provinceExperience,
      /**
       * 经验值
       */
      experience: provinceExperience.experience_value,
      /**
       * 省份名称
       */
      province: `${province}` || '未知省份',
      /**
       * 城市
       */
      city: `${city}` || '未知城市'
    })
  }

  /**
   * 通过经纬度获取位置信息
   *
   * @param longitude 经度
   * @param latitude 纬度
   */
  private async getLocationInfo(
    longitude: CreatePositionRecordDTO['longitude'],
    latitude: CreatePositionRecordDTO['latitude']
  ) {
    const response = await this.httpService.axiosRef.get(AMap.geocode_regeo, {
      params: {
        key: this.apiKey,
        location: `${longitude}, ${latitude}`
      }
    })

    return response.data
  }

  /**
   * 创建步行记录单独一项
   *
   * @param options 参数列表
   */
  private async createRoute(options: Partial<UserRoute>) {
    const newUserRoute = new UserRoute()

    newUserRoute.list_id = options.list_id
    newUserRoute.user_id = options.user_id
    newUserRoute.longitude = options.longitude
    newUserRoute.latitude = options.latitude
    newUserRoute.city = options.city
    newUserRoute.province_code = options.province_code
    newUserRoute.address = options.address
    newUserRoute.name = options.name
    newUserRoute.province = options.province
    newUserRoute.create_at = options.create_at

    const result = await this.userRouteEntity.save(newUserRoute)

    return result
  }

  /**
   * 创建步行记录集合
   *
   * @param user_id 用户 id
   */
  private async createRouteList(user_id: string) {
    const currentDate = new Date()

    /**
     * @see Date.prototype.setHours() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
     */
    currentDate.setHours(0, 0, 0, 0) // 设置时间为当天的开始时间

    /**
     * @see 使用查询生成器选择 https://typeorm.io/select-query-builder
     * @see 什么是QueryBuilder https://typeorm.io/select-query-builder#what-is-querybuilder
     */
    const queryBuilder = await this.userRouteListEntity.createQueryBuilder(
      'userRouteListEntity'
    )

    /**
     * 查询今天是否发布过内容
     *
     * 要从数据库获取所有数据需要使用 getMany
     * 要从数据库获取指定一个数据需要使用 getOne
     *
     * @see 使用获取值QueryBuilder https://typeorm.io/select-query-builder#getting-values-using-querybuilder
     */
    const todayRelease: UserRouteList = await queryBuilder
      .where('userRouteListEntity.user_id = :userId', { userId: user_id })
      .andWhere('userRouteListEntity.create_at >= :currentDate', {
        currentDate
      })
      .getOne()

    // 如果今天发布过
    if (todayRelease) {
      return todayRelease
    }

    const newRouteList = new UserRouteList()

    newRouteList.user_id = user_id
    newRouteList.list_id = renderID(PrefixID.route)
    newRouteList.create_at = new Date()

    const newRouteListResult = await this.userRouteListEntity.save(newRouteList)

    return newRouteListResult
  }
}
