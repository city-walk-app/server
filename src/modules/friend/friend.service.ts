import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result, renderID } from 'src/utils'
import { UserFriendInvite, UserFriendRelation } from './entity'
import { HttpCode, FriendState, PrefixID } from 'src/enum'
import { UserInfo } from '../user'

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserFriendInvite)
    private readonly userFriendInviteEntity: Repository<UserFriendInvite>,
    @InjectRepository(UserFriendRelation)
    private readonly userFriendRelationEntity: Repository<UserFriendRelation>,
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>
  ) {}

  /**
   * 邀请朋友
   *
   * @param user_id 用户 id
   */
  async friendInvite(user_id: string) {
    /** 新建邀请 */
    const newUserFriendInvite = new UserFriendInvite()

    newUserFriendInvite.state = FriendState.applying
    newUserFriendInvite.created_at = new Date()
    newUserFriendInvite.user_id = user_id
    newUserFriendInvite.invite_id = renderID(PrefixID.invite)

    const result = await this.userFriendInviteEntity.save(newUserFriendInvite)

    if (result) {
      return new Result(HttpCode.OK, 'ok', result.invite_id)
    }

    return new Result(HttpCode.ERR, '邀请异常')
  }

  /**
   * 获取邀请详情
   *
   * @param user_id 用户 id
   * @param invite_id 邀请 id
   */
  async getFriendInviteInfo(user_id: string, invite_id: string) {
    const inviteRes = await this.userFriendInviteEntity.findOneBy({
      user_id,
      invite_id
    })

    if (!inviteRes) {
      return new Result(HttpCode.ERR, '暂无邀请')
    }

    /** 获取邀请人信息 */
    const userInfo = await this.userInfoEntity.findOneBy({ user_id })

    return new Result(HttpCode.OK, 'ok', {
      name: userInfo.nick_name,
      avatar: userInfo.avatar
    })
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
