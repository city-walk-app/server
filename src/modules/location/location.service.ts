import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result, renderID } from 'src/utils'
import { HttpCode, AMap, PrefixID } from 'src/enum'
import { ConfigService } from '@nestjs/config'
import { CreatePositionRecordDTO } from './dto'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import axios from 'axios'
import { CITY_NAME_CODE } from './data'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class LocationService {
  /** 高德地图密钥 */
  private apiKey: string

  /**
   * @param configService 配置服务
   * @param userVisitedProvince 用户访问的省份数据库
   * @param userRouteEntity 用户步行地址信息详情
   * @param userRouteListEntity 用户步行地址信息详情列表
   * @param httpService 请求服务
   */
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserVisitedProvince)
    private readonly userVisitedProvince: Repository<UserVisitedProvince>,
    @InjectRepository(UserRoute)
    private readonly userRouteEntity: Repository<UserRoute>,
    @InjectRepository(UserRouteList)
    private readonly userRouteListEntity: Repository<UserRouteList>,
    private readonly httpService: HttpService
  ) {
    this.apiKey = this.configService.get('DB_MAP_API_KEY')
  }

  /**
   * 获取周边热门地点
   *
   * @param longitude 精度
   * @param latitude 纬度
   */
  async getPopularRecommends(longitude: number, latitude: number) {
    /**
     * 周边搜索
     *
     * @see 周边搜索 https://lbs.amap.com/api/webservice/guide/api-advanced/newpoisearch
     */
    const response = await axios({
      url: 'https://restapi.amap.com/v5/place/around',
      method: 'GET',
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

      console.log(data)

      return new Result(HttpCode.OK, 'ok', data)
    }

    return new Result(HttpCode.OK, 'ok', [])
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
      await this.userVisitedProvince.findOneBy({
        user_id,
        province_code
      })

    console.log('获取', provinceExperience)

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

      const result = await this.userVisitedProvince.save(newProvinceExperience)

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

      const res = await this.userVisitedProvince.save(provinceExperience)

      // 避免上一步创建失败
      if (!res) {
        return new Result(HttpCode.ERR, '增加经验值错误')
      }
    }

    // 创建步行记录
    const createRouteRes = await this.createRouteList(
      user_id,
      longitude,
      latitude
    )

    console.log(createRouteRes)

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
      province,
      /**
       * 城市
       */
      city
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
        location: `${longitude},${latitude}`
      }
    })

    return response.data
  }

  /**
   * 创建步行记录
   *
   * @param user_id 用户 id
   * @param longitude 经度
   * @param latitude 纬度
   */
  private async createRouteList(
    user_id: string,
    longitude: CreatePositionRecordDTO['longitude'],
    latitude: CreatePositionRecordDTO['latitude']
  ) {
    // 查 route_list 今天是否有记录

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
    console.log(123)
  }
}
