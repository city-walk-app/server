/**
 * 用户相关
 */

/**
 * 检测是否为邮箱
 *
 * @param email 邮箱地址
 * @returns { boolean } 是否为邮箱地址
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/** 设置头像上传的路径 */
export const getDate = (): string => {
  const date: Date = new Date()
  const year: string = date.getFullYear().toString()
  let month: string = (date.getMonth() + 1).toString()
  month = month.length === 1 ? '0' + month : month
  let day: string = date.getDate().toString()
  day = day.length === 1 ? '0' + day : day
  return `${year}-${month}-${day}`
}
