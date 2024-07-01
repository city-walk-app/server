import { HttpStatus } from '@nestjs/common'

/**
 * 状态码
 */
export enum HttpCode {
  /**
   * 0
   *
   * 对于后端的所有通用错误处理状态吗
   *
   * 比如前端的参数丢失、字段格式不正确等
   */
  ERR = 0,

  /**
   * 200
   *
   * 用于所有的成功处理
   */
  OK = HttpStatus.OK,

  /**
   * 500
   *
   * 服务器内部错误
   */
  INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR
}
