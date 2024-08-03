const { toString } = Object.prototype

/**
 * 检测一个值是否为指定的类型
 *
 * @param { * } value 要检测的值
 * @param type 预期类型
 * @returns { boolean } 这个值是否为传入的类型
 */
const is = (value: unknown, type: string): boolean => {
  return toString.call(value) === `[object ${type}]`
}

/**
 * 检测一个数据是否为 string 类型
 *
 * @param { * } value 要检测的值
 * @returns { boolean }
 */
export const isString = (value: any): value is string =>
  typeof value === 'string'

/**
 * 检测一个数据是否为 number 类型
 *
 * @param { * } value 要检测的数据
 * @returns { boolean }
 * @see isNaN() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value)

/**
 * 检测一个数据是否为 boolean 类型
 *
 * @param { * } value 要检测的数据
 * @returns { boolean }
 */
export const isBoolean = (value: unknown): value is boolean =>
  is(value, 'Boolean')

/**
 * 判断一个值是否为 array 类型
 *
 * @param { * } value 要检测的值
 * @returns { boolean }
 */
export const isArray = Array.isArray
