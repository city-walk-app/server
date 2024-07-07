import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'
import { ConfigService } from '@nestjs/config'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import axios from 'axios'

@Injectable()
export class LocationService {
  /** 高德地图密钥 */
  apiKey: string

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserVisitedProvince)
    private readonly userVisitedProvince: Repository<UserVisitedProvince>,
    @InjectRepository(UserRoute)
    private readonly userRouteEntity: Repository<UserRoute>,
    @InjectRepository(UserRouteList)
    private readonly userRouteListEntity: Repository<UserRouteList>
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
   * @param params 参数列表
   */
  async createPositionRecord(user_id, params) {
    return new Result(HttpCode.OK, 'ok', { user_id, ...params })
  }
}
