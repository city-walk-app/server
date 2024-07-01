/**
 * 将字符串通过逗号分隔转换为数组
 *
 * @param str 字符串
 * @returns 格式化的数组
 */
export const splitStr = (str?: string): string[] => {
  if (typeof str === 'string' && str.length) {
    return str.split(',')
  }
  return []
}

/**
 * 将 RGB 颜色转换为 hex 色号
 *
 * @param r R
 * @param g G
 * @param b B
 * @returns
 */
export const rgbToHex = (rgbaList: number[]): string => {
  /**
   * 将每个 RGB 分量的值转换为十六进制，并保证是两位数
   *
   * @param c 颜色
   */
  const componentToHex = (c: number): string => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  /** 使用 componentToHex 转换每个分量，并拼接成 HEX 颜色 */
  const hexColor =
    '#' +
    componentToHex(rgbaList[0]) +
    componentToHex(rgbaList[1]) +
    componentToHex(rgbaList[2])

  return hexColor.toUpperCase() // 将结果转为大写，以保持一致性
}

/**
 * 深克隆
 *
 * @param { Array | Object } obj 克隆对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as any
  }

  const clonedObj = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }

  return clonedObj
}
