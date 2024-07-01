import { Injectable } from '@nestjs/common'
import { UserInfo } from '../user'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from 'src/utils'
import { UserAdmin } from './entity'
import { HttpCode } from 'src/enum'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>,
    @InjectRepository(UserAdmin)
    private readonly userAdminEntity: Repository<UserAdmin>
  ) {}

  /**
   * 获取用户列表
   */
  async getUserList() {
    const data = await this.userInfoEntity.find()

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 登录
   *
   * @param email 邮箱
   */
  async login(email: string) {
    /** 用户信息 */
    const userInfo = await this.userAdminEntity.findOneBy({ email })

    // 用户不存在
    if (!userInfo) {
      return new Result(HttpCode.ERR, '用户不存在')
    }

    /** 用户身份信息 */
    // const token = jwt({ id: userInfo.id, email: userInfo.email })

    return new Result(HttpCode.OK, '登录成功', {
      // token,
      id: userInfo.id,
      email: userInfo.email
    })
  }
}
