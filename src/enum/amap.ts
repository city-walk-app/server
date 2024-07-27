/**
 * 高德地图 API 接口地址
 */
export enum AMap {
  /**
   * 地理/逆地理编码
   *
   * @see georegeo https://lbs.amap.com/api/webservice/guide/api/georegeo
   */
  geocode_regeo = 'https://restapi.amap.com/v3/geocode/regeo',

  /**
   * 周边搜索
   *
   * @see 周边搜索 https://lbs.amap.com/api/webservice/guide/api-advanced/newpoisearch
   */
  place_around = 'https://restapi.amap.com/v5/place/around',

  /**
   * ip 定位
   *
   * @see ipconfig https://lbs.amap.com/api/webservice/guide/api/ipconfig
   */
  ip = 'https://restapi.amap.com/v3/ip',

  /**
   * 天气查询
   * 
   * @see weatherinfo https://lbs.amap.com/api/webservice/guide/api/weatherinfo
   */
  weather = 'https://restapi.amap.com/v3/weather/weatherInfo'
}
