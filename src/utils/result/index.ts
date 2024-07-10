import { HttpCode } from 'src/enum'

export class Result {
  code: HttpCode
  message: string
  data?: any

  /**
   * @param code 状态码
   * @param message 描述信息
   * @param data 返回数据
   */
  constructor(code: HttpCode, message: string, data?: any) {
    this.code = code
    this.message = message
    this.data = data
  }
}
