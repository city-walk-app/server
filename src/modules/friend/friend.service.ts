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
      // user_id,
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

  /**
   * 同意好友申请
   *
   * @param user_id 用户 id
   * @param invite_id 邀请 id
   */
  async confirmInvite(user_id: string, invite_id: string) {
    const inviteInfo = await this.userFriendInviteEntity.findOneBy({
      invite_id
    })

    console.log(inviteInfo)

    /** 增加一条我的关系 */
    const myRelation = new UserFriendRelation()

    myRelation.friend_id = user_id
    myRelation.user_id = inviteInfo.user_id
    myRelation.state = FriendState.normal
    myRelation.created_at = new Date()

    console.log(myRelation)

    const res = await this.userFriendRelationEntity.save(myRelation)

    console.log('red', res)

    /** 增加一条对方的关系 */
    const friendRelation = new UserFriendRelation()

    friendRelation.friend_id = inviteInfo.user_id
    friendRelation.user_id = user_id
    friendRelation.state = FriendState.normal
    friendRelation.created_at = new Date()

    await this.userFriendRelationEntity.save(friendRelation)

    return new Result(HttpCode.OK, 'ok')
  }

  /**
   * 拒绝好友申请
   *
   * @param user_id 用户 id
   * @param invite_id 邀请 id
   */
  refuseInvite(user_id: string, invite_id: string) {
    return 13
  }
}
