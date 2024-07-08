import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { deepClone, Result } from 'src/utils'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import { CITY_NAME_CODE, MAP_DATA } from './data/index'
import { HttpCode } from 'src/enum'

@Injectable()
export class GpsService {
  /** 高德地图密钥 */
  apiKey: string

  /**
   * @param userVisitedProvince 用户访问的省份数据库
   * @param userRouteEntity 用户步行地址信息详情数据库
   * @param userRouteListEntity 用户步行地址信息详情列表数据库
   */
  constructor(
    @InjectRepository(UserVisitedProvince)
    private readonly userVisitedProvince: Repository<UserVisitedProvince>,
    @InjectRepository(UserRoute)
    private readonly userRouteEntity: Repository<UserRoute>,
    @InjectRepository(UserRouteList)
    private readonly userRouteListEntity: Repository<UserRouteList>,
  ) {
    this.apiKey = 'ca2358293d08bfa6028bb8fb1c076130'
  }

  /**
   * 获取 ip
   *
   * @param ip ip
   */
  async positioning(ip: string) {
    /**
     * ip 定位
     *
     * @see ipconfig https://lbs.amap.com/api/webservice/guide/api/ipconfig
     */
    const response = await axios({
      url: 'https://restapi.amap.com/v3/ip',
      method: 'GET',
      params: {
        key: this.apiKey,
        ip
      }
    })

    return response
  }

  /**
   * 通过经纬度获取位置信息
   *
   * @param longitude 经度
   * @param latitude 纬度
   * @param user_id 用户 id
   */
  async getLocationInfo(longitude: number, latitude: number, user_id: string) {
    /**
     * 获取逆地理编码
     *
     * @see georegeo https://lbs.amap.com/api/webservice/guide/api/georegeo
     */
    const response = await axios({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      method: 'GET',
      params: {
        key: this.apiKey,
        location: `${longitude},${latitude}`
      }
    })

    if (
      response.data.status === '1' &&
      response.data.regeocode &&
      response.data.regeocode.addressComponent
    ) {
      /** 省份 code 和省份名称 */
      const { adcode, province, city } =
        response.data.regeocode.addressComponent

      // 如果为空，则是无法解析的地理坐标，可能不是中国大陆及港澳特别行政区、台湾省坐标
      if (!adcode || !adcode.length) {
        return new Result(
          HttpCode.ERR,
          '非中国大陆及港澳特别行政区、台湾省坐标'
        )
      }

      /** 格式化后的省份编码 */
      const province_code = `${adcode}`.slice(0, 2) + '0000'

      // 如果数组中不存在格式化后的数组，则说明编码不正确，提前拦截
      if (!(province_code in CITY_NAME_CODE)) {
        return new Result(HttpCode.ERR, '无效省份编码')
      }

      /** 获取到经验值 */
      const provinceExperience = await this.userVisitedProvince.findOneBy({
        user_id,
        province_code
      })

      return new Result(HttpCode.OK, '获取成功', {
        province_code,
        province,
        city,
        experience_value: provinceExperience
          ? provinceExperience.experience_value
          : 0
      })
    }

    return new Result(HttpCode.ERR, '高德地图接口响应异常')
  }

  /**
   * 获取当前打卡位置
   *
   * @param longitude 精度
   * @param latitude 纬度
   * @param user_id 用户 id
   */
  async getProvince(longitude: number, latitude: number, user_id: string) {
    if (!longitude || !latitude || !user_id) {
      return new Result(HttpCode.ERR, '必要参数缺失')
    }

    /** 获取当前位置信息 */
    const locationInfoRes = await this.getLocationInfo(
      longitude,
      latitude,
      user_id
    )

    // 地址获取失败返回的错误信息
    if (locationInfoRes.code !== HttpCode.OK) {
      return new Result(
        HttpCode.ERR,
        locationInfoRes.message || '不确定位置信息'
      )
    }

    const { province_code } = locationInfoRes.data

    /** 查找当前用户是否在当前的省份打卡过 */
    const result = await this.userVisitedProvince.findOneBy({
      province_code,
      user_id
    })

    // 如果没有打卡过，则添加一天打开记录
    if (!result) {
      /** 创建一条新纪录 */
      const newRecord = new UserVisitedProvince()

      newRecord.province_code = province_code
      newRecord.user_id = user_id
      newRecord.user_id = user_id
      newRecord.province_name = CITY_NAME_CODE[province_code]
      newRecord.experience_value = 0

      /** 设置结果 */
      const data = await this.userVisitedProvince.save(newRecord)

      if (data) {
        return new Result(HttpCode.OK, 'ok', data)
      }

      return new Result(HttpCode.ERR, '失败')
    }

    return new Result(HttpCode.ERR, '用户已在该省份打卡过了')
  }

  /**
   * 获取用户去过的省份
   *
   * @param user_id 用户 id
   */
  async getUserProvince(user_id: string) {
    const data = await this.userVisitedProvince.findBy({ user_id })

    if (data) {
      return new Result(HttpCode.OK, 'ok', data)
    }

    return new Result(HttpCode.ERR, '暂无数据')
  }



  /**
   * 创建用户打卡记录详情方法封装
   *
   * @param params 参数对象
   * @param [new_province] 打卡新省份
   */
  async createUserRoute(params: UserRoute, new_province?: UserVisitedProvince) {
    /** 创建地点记录 */
    const userRoute = new UserRoute()

    userRoute.user_id = params.user_id
    userRoute.list_id = params.list_id
    userRoute.create_at = new Date()
    userRoute.latitude = params.latitude
    userRoute.longitude = params.longitude
    userRoute.province = params.province || '未知省份'
    userRoute.city = `${params.city}` || '未知城市'
    userRoute.address = params.address
    userRoute.name = params.name
    userRoute.province_code = params.province_code

    /** 创建新的打卡记录 */
    const newUserRoute = await this.userRouteEntity.create(userRoute)

    const data = await this.userRouteEntity.save(newUserRoute)


    if (data) {
      return new Result(HttpCode.OK, '地点打卡成功', {
        ...data,
        new_province
      })
    }

    return new Result(HttpCode.ERR, '打卡异常')
  }

  /**
   * 创建当前位置记录，打卡当前位置
   *
   * @param user_id 用户 id
   * @param body 请求参数
   */
  async createPositionRecord(user_id: string, body: UserRoute) {
    try {
      /** 检测是否为新的城市 */
      const newProvince = await this.getProvince(
        body.longitude,
        body.latitude,
        user_id
      )

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

      /** 获取当前位置信息 */
      const locationInfoRes = await this.getLocationInfo(
        body.longitude,
        body.latitude,
        user_id
      )

      // 地址获取失败返回的错误信息
      if (locationInfoRes.code !== HttpCode.OK) {
        return locationInfoRes
      }

      /** 省份名称集合 */
      const provinceNameAll = Object.values(CITY_NAME_CODE)

      /** 获取当前位置是省份名称 */
      const privateName = provinceNameAll.find((item) => {
        return (locationInfoRes.data.province as string).includes(item)
      })

      /** 省份名称 */
      const province = privateName || '未知省份'
      /** 城市名称 */
      const city = locationInfoRes.data.city || '未知城市'
      const province_code = locationInfoRes.data.province_code

      console.log('todayRelease', todayRelease, locationInfoRes)

      // 今天如果发布过内容，则创建单个打卡地点
      if (todayRelease && todayRelease.id) {
        return this.createUserRoute(
          {
            id: 0, // id 是没有用的，只是为了类型正确
            user_id: todayRelease.user_id,
            list_id: todayRelease.id,
            create_at: new Date(),
            latitude: body.latitude,
            longitude: body.longitude,
            address: body.address,
            name: body.name,
            city,
            province,
            province_code
          },
          newProvince.code === HttpCode.OK ? newProvince.data : null
        )
      }

      /**
       * 今日如果没有打卡过
       *
       * 则现创建一条记录，再打卡单个地点
       */
      const userRouteList = new UserRouteList()

      userRouteList.user_id = user_id
      userRouteList.create_at = new Date()

      const newUserRouteList = await this.userRouteListEntity.create(
        userRouteList
      )

      const data: UserRouteList = await this.userRouteListEntity.save(
        newUserRouteList
      )

      // 记录创建成功
      if (data) {
        return this.createUserRoute(
          {
            id: 0, // id 是没有用的，只是为了类型正确
            user_id,
            list_id: newUserRouteList.id,
            create_at: new Date(),
            latitude: body.latitude,
            longitude: body.longitude,
            address: body.address,
            name: body.name,
            city,
            province,
            province_code
          },
          newProvince.code === HttpCode.OK ? newProvince.data : null
        )
      }

      return new Result(HttpCode.ERR, '打卡异常')
    } catch (err) {
      return new Result(HttpCode.ERR, `${err}`)
    }
  }

  /**
   * 获取用户当天发布位置记录
   *
   * @param user_id 用户 id
   */
  async getRoute(user_id: string) {
    const currentDate = new Date()

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

    // 今天如果发布过内容
    if (todayRelease && todayRelease.id) {
      const data = await this.userRouteEntity.findBy({
        list_id: todayRelease.id
      })

      return new Result(HttpCode.OK, 'ok', data)
    }

    return new Result(HttpCode.OK, '无记录', [])
  }

  /**
   * 获取步行打卡记录
   *
   * @param user_id 用户 id
   * @param page 页码
   * @param page_size 每页大小
   */
  async getRouteList(user_id: string, page: number, page_size: number) {
    page = Number(page)
    page_size = Number(page_size)

    try {
      /** 列表信息 */
      const routeList = await this.userRouteListEntity.find({
        where: { user_id },
        order: { create_at: 'DESC' },
        skip: (page - 1) * page_size,
        take: page_size
      })

      if (routeList && routeList.length) {
        const data = await Promise.all(
          routeList.map(async (item) => {
            /** 详细位置信息 */
            const route_detail = await this.userRouteEntity.find({
              where: { list_id: item.id }
            })

            return {
              ...item,
              route_detail: route_detail.length || 0,
              city: route_detail[0]?.city,
              province: route_detail[0]?.province
            } as const
          })
        )

        return new Result(HttpCode.OK, 'ok', data)
      }

      return new Result(HttpCode.OK, '无记录', [])
    } catch (err) {
      return new Result(HttpCode.ERR, `${err}`)
    }
  }

  /**
   * 获取地点历史打卡记录
   *
   * @param user_id 用户 id
   * @param list_id 列表 id
   */
  async getRouteHistory(user_id: string, list_id: number) {
    const data = await this.userRouteEntity.findBy({ user_id, list_id })

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 获取地图数据
   *
   * @param code 指定身份编码
   */
  getMapData(code?: number) {
    if (code) {
      const _MAP_DATA = deepClone(MAP_DATA)
      /** 找到当前身份 */
      const currentProvince = _MAP_DATA.features.find((item) => {
        return item.properties.code === Number(code)
      })

      if (!currentProvince) {
        return new Result(HttpCode.ERR, `${code} 不是一个有效的省份编码`)
      }

      _MAP_DATA.features = [currentProvince]

      return new Result(HttpCode.OK, 'ok', _MAP_DATA)
    }

    return new Result(HttpCode.OK, 'ok', MAP_DATA)
  }

  /**
   * 获取用户所有打卡记录
   *
   * @param user_id 用户 id
   */
  async getRouterHistory(user_id: string) {
    const data = await this.userRouteEntity.findBy({ user_id })

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 获取周边热门地点
   *
   * @param longitude 精度
   * @param latitude 纬度
   */
  async getPopularLocations(longitude: number, latitude: number) {
    console.log(longitude, latitude, '111')
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
}
