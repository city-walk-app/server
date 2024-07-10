/**
 * ID 前缀
 */
export enum PrefixID {
  /**
   * 用户 id 前缀
   */
  user = 'U',

  /**
   * 访问 id 前缀，用于记录用户走过的省份数据表：cw_user_visited_province
   */
  visitedProvince = 'VP',

  /**
   * 步行记录 id 前缀，用于记录用户打卡的地点，数据表：cw_user_route_list
   */
  routeList = 'RL',

  /**
   * 邀请 id 前缀
   */
  invite = 'IN',

  /**
   * 步行 id 前缀。用于步行记录每一项的详情，数据表：cw_user_route
   */
  route = 'RE'
}
