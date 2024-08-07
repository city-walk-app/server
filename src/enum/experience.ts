/**
 * 经验分配
 */
export enum Experience {
  /**
   * 附加的经验值
   *
   * 用于完善打卡记录，每多一条完善的内容增加指定倍数的附加经验值
   */
  ADDITIONAL = 10,

  /**
   * 创建打卡记录所获得的经验值
   */
  CREATE = 20
}

/**
 * 经验等级分配标准
 */
export enum ExperienceStep {
  D = 900,

  C = 2000,

  B = 4000,

  A = 9000,

  S = 21998
}

/**
 * 默认的经验文案
 */
export const defaultExperienceContents = [
  '完善打卡内容可以获得多经验值',
  '',
  '',
  '',
  '',
  '',
  ''
]
