export enum PrefixID {
  /**
   * 用户 id 前缀
   */
  user = 'U',

  /**
   * 访问 id 前缀，用于记录用户走过的省份数据表：cw_user_visited_province
   */
  vis = 'VIS',

  /**
   * 步行记录 id 前缀，用于记录用户打卡的地点，数据表：cw_user_route_list
   */
  route = 'RO'
}
