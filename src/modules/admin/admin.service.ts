import { Injectable } from '@nestjs/common'
import { UserInfo } from '../user'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from 'src/utils'
import { HttpCode } from 'src/enum'

@Injectable()
export class AdminService {
  /**
   * @param userInfoEntity 用户信息
   */
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>,
  ) { }

  /**
   * 获取用户列表
   */
  async getUserList() {
    const data = await this.userInfoEntity.find()

    return new Result(HttpCode.OK, 'ok', data)
  }
}
