/**
 * 获取当前格式化后的时间
 */
export const getCurrentDateFormatted = (): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，故+1
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
