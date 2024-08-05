import { PrefixID } from 'src/enum'
import * as crypto from 'crypto'

/**
 * 格式化 uuid
 *
 * @param uuid uuid
 */
const uuidToDecimal = (uuid: string): string => {
  /**
   * 移除破折号
   */
  const hexString = uuid.replace(/-/g, '')

  /**
   * 将十六进制字符串转换为十进制字符串
   */
  const bigInt = BigInt(`0x${hexString}`)

  return bigInt.toString(10)
}

/**
 * 生成 id
 *
 * @param prefix 前缀
 */
export const renderID = (prefix: PrefixID): string => {
  const uuid = crypto.randomUUID()

  const decimalUUID = uuidToDecimal(uuid)

  return prefix + decimalUUID
}
