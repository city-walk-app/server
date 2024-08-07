/**
 * 获取从 0 到指定整数（包括指定整数在内）的随机数
 *
 * @param {number} max - 指定的整数
 */
export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * (max + 1))
}
