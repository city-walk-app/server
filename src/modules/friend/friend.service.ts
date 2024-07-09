import { Injectable } from '@nestjs/common'
import { UserInfo } from '../user'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result } from 'src/utils'
import { UserFriendInvite, UserFriendRelation } from './entity'
import { HttpCode } from 'src/enum'

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserFriendInvite)
    private readonly userFriendInviteEntity: Repository<UserFriendInvite>,
    @InjectRepository(UserFriendRelation)
    private readonly userFriendRelationEntity: Repository<UserFriendRelation>
  ) { }


  /**
   * 邀请朋友
   *
   * @param user_id 用户 id
   */
  friendInvite(user_id: string) {
    console.log(user_id)

    return new Result(HttpCode.OK, 'ok', user_id)
  }

  /**
   * 获取朋友列表
   *
   * @param user_id 用户 id
   */
  friendList(user_id: string) {
    console.log(user_id)

    return new Result(HttpCode.OK, 'ok', user_id)
  }
}