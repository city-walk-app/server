import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  Result,
  renderID,
  getCurrentDateFormatted,
  isArray,
  isString,
  isNumber,
  isEmptyArray,
  getRandomNumber
} from 'src/utils'
import {
  HttpCode,
  AMap,
  PrefixID,
  CITY_NAME_CODE,
  Experience,
  PreferenceMap,
  PreferenceKey,
  heatmapColor,
  moodColorMap,
  MoodColor,
  TravelType,
  ExperienceStep,
  defaultExperienceContents
} from 'src/enum'
import { ConfigService } from '@nestjs/config'
import {
  CreatePositionRecordDto,
  GetUserRouteDetailDto,
  UpdateUserRouteDetailDto,
  GetUserMonthHeatmapDto
} from './dto'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import { HttpService } from '@nestjs/axios'
import { LoggerService } from 'src/common'
import { UserInfo } from '../user'
// import requestIp from 'request-ip'

@Injectable()
export class LocationService {
  /**
   * 高德地图密钥
   */
  private apiKey: string
  /**
   * 一个月默认天数
   */
  private monthHeatmapDays = 31

  /**
   * @param httpService 日志服务
   * @param httpService 请求服务
   * @param configService 配置服务
   * @param userVisitedProvinceEntity 用户访问的省份数据库
   * @param userRouteEntity 用户步行地址信息详情
   * @param userRouteListEntity 用户步行地址信息详情列表
   * @param userInfoEntity 用户表
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
    private readonly userRouteListEntity: Repository<UserRouteList>,
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>
  ) {
    this.apiKey = this.configService.get('DB_MAP_API_KEY')
  }

  /**
   * 获取当前地区的天气
   *
   * @param longitude 经度
   * @param latitude 纬度
   */
  async getWeatherInfo(longitude: number, latitude: number) {
    /**
     * 通过经纬度调用高德地图 API 获取当前的位置信息
     */
    const locationInfo = await this.getLocationInfo(longitude, latitude)

    // 非中国地区
    if (!locationInfo) {
      throw new BadRequestException('当前位置无法获取天气')
    }

    /** 格式化后的省份编码 */
    const province_code = `${locationInfo.adcode}`.slice(0, 2) + '0000'

    // 如果数组中不存在格式化后的数组，则说明编码不正确，提前拦截
    if (!(province_code in CITY_NAME_CODE)) {
      throw new BadRequestException('无效省份编码')
    }

    const response = await this.httpService.axiosRef.get(AMap.weather, {
      params: {
        key: this.apiKey,
        city: province_code // 城市编码
      }
    })

    if (response.data.status === '1') {
      return new Result(HttpCode.OK, 'ok', response.data.lives[0])
    }

    throw new BadRequestException('天气获取异常')
  }

  /**
   * 完善步行打卡记录详情
   *
   * @param user_id 用户 id
   * @param body 数据参数
   */
  async updateRouteDetail(user_id: string, body: UpdateUserRouteDetailDto) {
    const routeDetail = await this.userRouteEntity.findOneBy({
      user_id,
      route_id: body.route_id
    })

    if (!routeDetail) {
      throw new BadRequestException('未找到记录')
    }

    console.log('传入的参数', body)

    routeDetail.content = body.content // 内容
    routeDetail.mood_color = body.mood_color // 出行方式
    routeDetail.travel_type = body.travel_type // 心情颜色
    routeDetail.address = body.address

    /** 上传的照片是否合法 */
    const isPictureOk = !!(
      isArray(body.picture) &&
      body.picture.length &&
      body.picture.every((z) => isString(z))
    )

    if (isPictureOk) {
      routeDetail.picture = body.picture.join(',')
    }

    /** 完善的信息内容映射 */
    const paramsMap = [
      !!body.content,
      !!body.mood_color,
      !!body.travel_type,
      !!body.address,
      isPictureOk
    ]
    /** 完善的信息数量 */
    const paramsCount = paramsMap.filter(Boolean).length

    // 完善了版图的信息，增加额外经验值
    if (isNumber(paramsCount) && paramsCount > 0) {
      await this.additionalProvinceExperience(
        user_id,
        paramsCount,
        routeDetail.province_code
      )

      await this.additionalRouteExperience(user_id, body.route_id, paramsCount)
    }

    const data = await this.userRouteEntity.save(routeDetail)

    console.log('完善步行打卡记录详情', data)

    return new Result(HttpCode.OK, 'ok')
  }

  /**
   * 获取随机打卡文案
   */
  private getExperienceContents() {
    const num = getRandomNumber(defaultExperienceContents.length)

    return defaultExperienceContents[num]
  }

  /**
   * 增加额外的打卡记录经验值
   *
   * @param user_id 用户 id
   * @param route_id 步行 id
   * @param count 增加的量级
   */
  private async additionalRouteExperience(
    user_id: string,
    route_id: string,
    count: number
  ) {
    try {
      const routeDetail = await this.userRouteEntity.findOneBy({
        user_id,
        route_id
      })

      if (!routeDetail) {
        return
      }

      /**
       * 需要增加的经验值
       */
      const addCount = Experience.ADDITIONAL * count
      /**
       * 旧的经验值
       */
      const oldExperienceValue = Number(routeDetail.experience_value || '0')
      /**
       * 最新的经验值
       */
      const experience_value = oldExperienceValue + addCount

      routeDetail.experience_value = experience_value

      await this.userRouteEntity.save(routeDetail)
    } catch (err) {
      this.loggerService.log('增加额外的打卡记录经验值方法异常' + err)
    }
  }

  /**
   * 增加额外的省份经验值
   *
   * @param user_id 用户 id
   * @param count 增加的量级
   * @param province_code 增加的省份 code
   */
  private async additionalProvinceExperience(
    user_id: string,
    count: number,
    province_code: string
  ) {
    try {
      const provinceExperience = await this.userVisitedProvinceEntity.findOneBy(
        {
          user_id,
          province_code
        }
      )

      if (!provinceExperience) {
        return null
      }

      /**
       * 需要增加的经验值
       */
      const addCount = Experience.ADDITIONAL * count
      /**
       * 旧的经验值
       */
      const oldExperienceValue = Number(
        provinceExperience.experience_value || '0'
      )
      /**
       * 最新的经验值
       */
      const experience_value = oldExperienceValue + addCount

      provinceExperience.experience_value = experience_value

      await this.userVisitedProvinceEntity.save(provinceExperience)
    } catch (err) {
      this.loggerService.log('增加额外的省份经验值' + err)
    }
  }

  /**
   * 获取周边热门地点
   *
   * @param user_id 用户 id
   * @param longitude 经度
   * @param latitude 纬度
   */
  async getPopularRecommends(
    user_id: string,
    longitude: number,
    latitude: number
  ) {
    /** 获取用户信息 */
    const userInfo = await this.userInfoEntity.findOneBy({ user_id })
    /** 地图获取类型 */
    let types = ''

    // 如果用户设置了喜欢的类型
    if (userInfo.preference_type) {
      try {
        const preferenceType = JSON.parse(userInfo.preference_type)

        // 如果喜欢类型解析正确
        if (preferenceType && preferenceType.length) {
          let userTypes = ''

          preferenceType.forEach((item: PreferenceKey, index: number) => {
            if (index + 1 === preferenceType.length) {
              userTypes = userTypes + PreferenceMap[item]
              return
            }

            userTypes = userTypes + PreferenceMap[item] + '|'
          })

          types = userTypes
        }
      } catch (err) {
        types = PreferenceMap.DEFAULT
      }
    }
    // 如果用户没有设置喜欢类型，则设置为默认
    else {
      types = PreferenceMap.DEFAULT
    }

    console.log(types)

    const response = await this.httpService.axiosRef.get(AMap.place_around, {
      params: {
        key: this.apiKey,
        location: `${longitude},${latitude}`,
        radius: 5000,
        types,
        page_size: 25
      }
    })

    console.log(response.status)

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
    const provinceList = await this.userVisitedProvinceEntity.find({
      where: { user_id },
      select: ['experience_value', 'province_code', 'province_name', 'vis_id']
    })

    const data = provinceList.map((item) => {
      return {
        ...item,
        background_color: this.getJigsawColor(item.experience_value)
      }
    })

    this.loggerService.log(
      '获取用户解锁的省份版图列表：' + JSON.stringify(data)
    )

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 找到一个输入中重复最多的元素
   *
   * @param data 数据
   * @param field 查找的键
   */
  private findMost<T>(data: T[], field: keyof T): string | null {
    const fieldCount: Record<string, number> = {}

    data.forEach((item) => {
      const value = String(item[field])

      if (fieldCount[value]) {
        fieldCount[value]++
      } else {
        fieldCount[value] = 1
      }
    })

    let maxCount = 0
    let result = null

    for (const value in fieldCount) {
      if (fieldCount[value] > maxCount) {
        maxCount = fieldCount[value]
        result = value === 'null' || !value ? null : value
      }
    }

    return result
  }

  /**
   * 获取用户步行记录列表
   *
   * @param user_id 用户 id
   */
  async getUserRouteList(user_id: string) {
    const routeList = await this.userRouteListEntity.findBy({ user_id })

    const data = await Promise.all(
      routeList.map(async (item) => {
        const route = await this.userRouteEntity.findBy({
          list_id: item.list_id
        })

        /** 最多的心情颜色类型 */
        const moodColorActive = this.findMost<UserRoute>(
          route,
          'mood_color'
        ) as MoodColor
        /** 最多的出行方式类型 */
        const travelTypeActive = this.findMost<UserRoute>(
          route,
          'travel_type'
        ) as TravelType

        console.log('mood_color', moodColorActive)

        return {
          ...item,
          route,
          mood_color: moodColorMap[moodColorActive] || null,
          travel_type: travelTypeActive,
          count: route.length
        }
      })
    )

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 获取用户步行记录详情
   *
   * @param user_id 用户 id
   * @param list_id 列表 id
   */
  async getUserRouteDetail(
    user_id: GetUserRouteDetailDto['user_id'],
    list_id: GetUserRouteDetailDto['list_id']
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
  async createPositionRecord(user_id: string, body: CreatePositionRecordDto) {
    const { longitude, latitude } = body

    /**
     * 通过经纬度调用高德地图 API 获取当前的位置信息
     */
    const locationInfo = await this.getLocationInfo(longitude, latitude)

    // 非中国地区
    if (!locationInfo) {
      throw new BadRequestException('当前位置无法打卡')
    }

    const { adcode, province, city } = locationInfo

    this.loggerService.log(
      '创建当前位置记录，打卡当前位置，高的地图返回：' +
        JSON.stringify(locationInfo)
    )

    /** 格式化后的省份编码 */
    const province_code = `${adcode}`.slice(0, 2) + '0000'

    // 如果数组中不存在格式化后的数组，则说明编码不正确，提前拦截
    if (!(province_code in CITY_NAME_CODE)) {
      throw new BadRequestException('无效省份编码')
    }

    /**
     * 获取当前省份的版图
     *
     * 通过用户 id 和省份 code 获取到当前用户所获的的当前省份的累积经验值
     *
     * 也可以作为是否为新省份的标识，如果没有获取到，则说明当前用户还没有在当前省份获取到过经验值，也就是未解锁
     */
    let provinceExperience = await this.userVisitedProvinceEntity.findOneBy({
      user_id,
      province_code
    })

    /**
     * 是否为解锁的新省份版图
     */
    const is_new_province = !provinceExperience

    // 判断当前省份经验值是否存在，如果存在则使用，不存在就创建一条新的
    if (!provinceExperience) {
      /** 新的省份版图 */
      provinceExperience = await this.createUserVisitedProvince({
        user_id,
        province_code,
        province_name: province
      })
    }

    // 避免上一步创建失败
    if (!provinceExperience) {
      throw new BadRequestException('创建新的省份版图错误')
    }

    /**
     * 旧的经验值
     */
    const oldExperienceValue = Number(
      provinceExperience.experience_value || '0'
    )

    /**
     * 最新的经验值
     */
    const experience_value = oldExperienceValue + Experience.CREATE

    provinceExperience.experience_value = experience_value

    const res = await this.userVisitedProvinceEntity.save(provinceExperience)

    // 避免上一步创建失败
    if (!res) {
      throw new BadRequestException('增加经验值错误')
    }

    /**
     * 创建步行记录列表数据
     */
    const createRouteListResult = await this.createRouteList(user_id)

    if (!createRouteListResult) {
      throw new BadRequestException('创建步行记录列表数据失败')
    }

    /**
     * 创建新的打卡地点详情
     */
    const createRouteResult = await this.createRoute({
      list_id: createRouteListResult.list_id,
      user_id,
      longitude,
      latitude,
      province_code,
      province: `${province}` || '未知省份',
      city: `${city}` || '未知城市'
    })

    if (!createRouteResult) {
      throw new BadRequestException('创建新的打卡地点详情失败')
    }

    this.loggerService.log('创建新的打卡地点详情：' + createRouteResult)

    return new Result(HttpCode.OK, 'ok', {
      province_code,
      route_id: createRouteResult.route_id,
      /**
       * 是否为中国大陆
       */
      is_in_china: true,
      /**
       * 是否为新省份
       */
      is_new_province,
      /**
       * 经验值
       */
      experience: provinceExperience.experience_value,
      province: `${province}` || '未知省份',
      city: `${city}` || '未知城市',
      background_color: this.getJigsawColor(
        provinceExperience.experience_value
      ),
      content: this.getCreatePositionRecordContent(
        oldExperienceValue,
        provinceExperience.experience_value,
        Experience.CREATE,
        `${province}` || '未知省份'
      )
    })
  }

  /**
   * 创建省份版图
   *
   * @param options 创建省份版图数据的参数列表
   */
  private async createUserVisitedProvince(
    options: Partial<UserVisitedProvince>
  ) {
    try {
      const newProvinceExperience = new UserVisitedProvince()

      newProvinceExperience.user_id = options.user_id
      newProvinceExperience.province_code = options.province_code
      newProvinceExperience.province_name = options.province_name
      newProvinceExperience.vis_id = renderID(PrefixID.visitedProvince)
      newProvinceExperience.experience_value = Experience.CREATE

      const result = await this.userVisitedProvinceEntity.save(
        newProvinceExperience
      )

      return result
    } catch (err) {
      this.loggerService.log(`创建省份版图方法异常${err}`)
      return err
    }
  }

  /**
   * 获取打卡经验值文案
   *
   * @param oldValue 旧的经验值
   * @param newValue 新的经验值
   * @param addValue 增加的经验值
   * @param province 省份名称
   */
  private getCreatePositionRecordContent(
    oldValue: number,
    newValue: number,
    addValue: number,
    province: string
  ): string {
    /** 相差的值，在这个值之内才显示还要 xx 经验解锁 */
    const count = 500
    /** 随机文案 */
    const randomContent = this.getExperienceContents()

    if (!oldValue || oldValue < ExperienceStep.D) {
      if (oldValue + addValue >= ExperienceStep.D) {
        return `恭喜你升温了${province}版图`
      }

      return `还需要获得${ExperienceStep.D - newValue}经验将会升温版图`
    } else if (oldValue >= ExperienceStep.D && oldValue < ExperienceStep.C) {
      if (oldValue + addValue >= ExperienceStep.C) {
        return `恭喜你升温了${province}版图`
      }

      const diff = ExperienceStep.C - newValue

      if (diff >= count) {
        return randomContent
      }

      return `还需要获得${diff}经验将会升温版图`
    } else if (oldValue >= ExperienceStep.C && oldValue < ExperienceStep.B) {
      if (oldValue + addValue >= ExperienceStep.B) {
        return `恭喜你升温了${province}版图`
      }

      const diff = ExperienceStep.B - newValue

      if (diff >= count) {
        return randomContent
      }

      return `还需要获得${diff}经验将会升温版图`
    } else if (oldValue >= ExperienceStep.B && oldValue < ExperienceStep.A) {
      if (oldValue + addValue >= ExperienceStep.A) {
        return `恭喜你升温了${province}版图`
      }

      const diff = ExperienceStep.A - newValue

      if (diff >= count) {
        return randomContent
      }

      return `还需要获得${diff}经验将会升温版图`
    } else if (oldValue >= ExperienceStep.A && oldValue < ExperienceStep.S) {
      if (oldValue + addValue >= ExperienceStep.S) {
        return `恭喜你${province}版图已经升温到最高等级`
      }

      const diff = ExperienceStep.S - newValue

      if (diff >= count) {
        return randomContent
      }

      return `还需要获得${diff}经验将会升温版图`
    } else if (oldValue >= ExperienceStep.S) {
      return randomContent
    }

    return randomContent
  }

  /**
   * 获取用户指定月份的热力图
   *
   * @param user_id 用户 id
   */
  async getUserMonthHeatmap(
    user_id: GetUserMonthHeatmapDto['user_id'],
    date?: string
  ) {
    /**
     * 获取开始和结束时间
     */
    const { startDate, endDate } = this.getUserMonthHeatmapDate(date)

    /**
     * 获取到当年指定用户打卡记录
     */
    const routeList = await this.userRouteListEntity
      .createQueryBuilder('user_route_list')
      .where('user_route_list.create_at >= :startDate', { startDate })
      .andWhere('user_route_list.create_at <= :endDate', { endDate })
      .andWhere('user_route_list.user_id = :user_id', { user_id })
      .getMany()

    console.log('列表', routeList)

    /**
     * 初始化一个月的天数数组
     */
    const monthMap = this.getDatesBetween(startDate, endDate)
    /**
     * 步行全部列表
     */
    const routeListMap = await Promise.all(
      routeList.map(async (item) => {
        /** 获取当天打卡记录列表 */
        const routes = await this.userRouteEntity.find({
          where: { list_id: item.list_id },
          select: [
            'list_id',
            'route_id',
            'province_code',
            'create_at',
            'city',
            'province',
            'latitude',
            'longitude',
            'content',
            'address',
            'picture',
            'travel_type',
            'mood_color'
          ]
        })

        return {
          date: getCurrentDateFormatted(new Date(item.create_at)),
          routes,
          list_id: item.list_id,
          route_count: routes.length,
          background_color: this.getHeatmapColor(routes.length)
        } as const
      })
    )

    const data = this.mergeData(monthMap, routeListMap)

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 通过经纬度获取位置信息
   *
   * 只有在中国大陆/台湾/香港澳门特别行政区才会返回位置信息详情，否则都返回 null
   *
   * @param longitude 经度
   * @param latitude 纬度
   */
  private async getLocationInfo(
    longitude: CreatePositionRecordDto['longitude'],
    latitude: CreatePositionRecordDto['latitude']
  ) {
    try {
      const response = await this.httpService.axiosRef.get(AMap.geocode_regeo, {
        params: {
          key: this.apiKey,
          location: `${longitude}, ${latitude}`
        }
      })

      // 获取位置信息错误
      if (
        !response.data ||
        response.data.status !== '1' ||
        !response.data.regeocode.addressComponent
      ) {
        return null
      }

      const { adcode, province, city } =
        response.data.regeocode.addressComponent

      console.log(isEmptyArray)

      // 非中国大陆/台湾/香港澳门特别行政区地址
      if (
        isEmptyArray(adcode) &&
        isEmptyArray(province) &&
        isEmptyArray(city)
      ) {
        return null
      }

      return response.data.regeocode.addressComponent
    } catch (err) {
      this.loggerService.log(`通过经纬度获取位置信息方法异常${err}`)
      return null
    }
  }

  /**
   * 创建步行记录单独一项
   *
   * @param options 参数列表
   */
  private async createRoute(options: Partial<UserRoute>) {
    try {
      const newUserRoute = new UserRoute()

      newUserRoute.route_id = renderID(PrefixID.route)
      newUserRoute.list_id = options.list_id
      newUserRoute.user_id = options.user_id
      newUserRoute.longitude = options.longitude
      newUserRoute.latitude = options.latitude
      newUserRoute.city = options.city
      newUserRoute.province_code = options.province_code
      newUserRoute.province = options.province
      newUserRoute.create_at = new Date()
      newUserRoute.experience_value = Experience.CREATE

      const result = await this.userRouteEntity.save(newUserRoute)

      return result
    } catch (err) {
      this.loggerService.log(`创建步行记录单独一项方法错误：${err}`)
      return null
    }
  }

  /**
   * 创建步行记录集合
   *
   * @param user_id 用户 id
   */
  private async createRouteList(user_id: string) {
    try {
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
      newRouteList.list_id = renderID(PrefixID.routeList)
      newRouteList.create_at = new Date()

      const newRouteListResult = await this.userRouteListEntity.save(
        newRouteList
      )

      return newRouteListResult
    } catch (err) {
      this.loggerService.log(`创建步行记录集合方法错误：${err}`)
      return null
    }
  }

  /**
   * 获取热力图颜色
   *
   * @param count 打卡数量
   */
  private getHeatmapColor(count: number) {
    /**
     * 计算索引值（将数字转为0基索引）
     */
    const index = Math.floor((count - 1) / 3)

    if (index > heatmapColor.length - 1) {
      return heatmapColor[heatmapColor.length - 1]
    }

    // 根据索引值返回相应的色号
    return heatmapColor[index] || null
  }

  /**
   * 获取热力图开始和结束时间
   *
   * @param date 日期
   */
  private getUserMonthHeatmapDate(date?: string) {
    console.log(date)
    if (date) {
      const [year, month] = date.split('-')
      /** 开始时间 */
      const startDate = new Date(`${year}-${month}-01`)
      /** 结束时间 */
      const endDate = new Date(`${year}-${(parseInt(month) % 12) + 1}-01`)

      return { startDate, endDate }
    }

    /** 开始时间 */
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - this.monthHeatmapDays)

    /** 结束时间 */
    const endDate = new Date()

    return { startDate, endDate }
  }

  /**
   * 获取一个时间段区间的日期映射
   *
   * @param start 开始时间
   * @param end 结束时间
   */
  private getDatesBetween(start: Date, end: Date) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const dates = []

    while (startDate <= endDate) {
      dates.push({
        date: getCurrentDateFormatted(new Date(startDate)),
        routes: null
      })

      startDate.setDate(startDate.getDate() + 1)
    }

    return dates
  }

  /**
   * 获取省份经验值颜色
   *
   * @param value 经验值
   */
  private getJigsawColor(value: number) {
    if (value < 1000) {
      return heatmapColor[0]
    } else if (value >= 1000 && value < 2000) {
      return heatmapColor[1]
    } else if (value >= 2000 && value < 3000) {
      return heatmapColor[2]
    } else if (value >= 3000 && value < 4000) {
      return heatmapColor[3]
    } else if (value >= 4000) {
      return heatmapColor[4]
    }

    return heatmapColor[0]
  }

  /**
   * 合并数组
   *
   * @param monthMap 日期数据
   * @param routeListMap 数据
   */
  private mergeData(
    monthMap: { date: string; routes: any }[],
    routeListMap: { date: string; routes: any }[]
  ) {
    const result = monthMap.map((month) => {
      /**
       * 是否有对应的数据
       */
      const correspondingData = routeListMap.find(
        (route) => route.date === month.date
      )

      if (correspondingData) {
        return {
          ...month,
          ...correspondingData,
          routes: isArray(correspondingData.routes)
            ? correspondingData.routes.map((item) => {
                return {
                  ...item,
                  picture: isString(item.picture)
                    ? item.picture.split(',')
                    : item.picture
                }
              })
            : []
        }
      }

      return { ...month, routes: [] }
    })

    return result
  }
}
