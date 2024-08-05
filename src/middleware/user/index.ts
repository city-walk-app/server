import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Request, Response, NextFunction } from 'express'
import { HttpCode, USER_INFO } from 'src/enum'
import { Result } from 'src/utils'

type DecodedType = {
  user_id: string
}

@Injectable()
export class UserMiddleware implements NestMiddleware {
  /**
   * @param jwtService jwt 服务
   * @param configService 配置服务
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'] as string

    if (!token) {
      return res
        .status(HttpStatus.OK)
        .json(new Result(HttpCode.ERR, '未登录'))
    }

    console.log('进入中间件', token)

    try {
      const decoded: DecodedType = this.jwtService.verify(token, {
        secret: this.configService.get('DB_TOKEN_KEY')
      })

      // 后面很多地方都需要用到用户 id，所以必须确保用户 id 是存在的
      if (!decoded || !decoded.user_id) {
        return res
          .status(HttpStatus.OK)
          .json(new Result(HttpCode.UNAUTHORIZED, '未登录'))
      }

      req[USER_INFO] = decoded

      next()
    } catch (err) {
      return res
        .status(HttpStatus.OK)
        .json(new Result(HttpCode.UNAUTHORIZED, '未登录'))
    }
  }
}
