/**
 * 心情状态颜色
 *
 * 心情希望都是积极向上的，最差的就是灰色-中性的，希望各位使用的时候都有着开心的心情，避免糟糕的情绪
 */
export enum MoodColor {
  /**
   * 红色-兴奋的
   */
  EXCITED = 'EXCITED',

  /**
   * 橙色-热情的
   */
  ENTHUSIASTIC = 'ENTHUSIASTIC',

  /**
   * 黄色-快乐的
   */
  HAPPY = 'HAPPY',

  /**
   * 绿色-放松的
   */
  RELAXED = 'RELAXED',

  /**
   * 蓝色-平静的
   */
  CALM = 'CALM',

  /**
   * 紫色-神秘的
   */
  MYSTERIOUS = 'MYSTERIOUS',

  /**
   * 灰色-中性的
   */
  NEUTRAL = 'NEUTRAL'
}

/**
 * 心情颜色枚举
 */
export const moodColorMap = {
  [MoodColor.EXCITED]: '#f16a59',
  [MoodColor.ENTHUSIASTIC]: '#f6a552',
  [MoodColor.HAPPY]: '#fad35c',
  [MoodColor.RELAXED]: '#74cd6d',
  [MoodColor.CALM]: '#4a8cf9',
  [MoodColor.MYSTERIOUS]: '#af72dc',
  [MoodColor.NEUTRAL]: '#9b9ca0',
}