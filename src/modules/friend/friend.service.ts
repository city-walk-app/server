import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Result, renderID } from 'src/utils'
import { UserFriendInvite, UserFriendRelation } from './entity'
import { HttpCode, FriendState, PrefixID } from 'src/enum'
import { UserInfo } from '../user'
import { UserRoute } from '../location'

@Injectable()
export class FriendService {
  /**
   * @param userFriendInviteEntity 用户好友关系表
   * @param userFriendRelationEntity 用户好友关系表
   * @param userInfoEntity 用户表
   * @param userRouteEntity 用户步行地址信息详情表
   */
  constructor(
    @InjectRepository(UserFriendInvite)
    private readonly userFriendInviteEntity: Repository<UserFriendInvite>,
    @InjectRepository(UserFriendRelation)
    private readonly userFriendRelationEntity: Repository<UserFriendRelation>,
    @InjectRepository(UserInfo)
    private readonly userInfoEntity: Repository<UserInfo>,
    @InjectRepository(UserRoute)
    private readonly userRouteEntity: Repository<UserRoute>
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
    /**
     * 通过邀请 id，查找申请中的一条数据
     */
    const inviteRes = await this.userFriendInviteEntity.findOneBy({
      invite_id,
      state: FriendState.applying
    })

    if (!inviteRes) {
      return new Result(HttpCode.ERR, '暂无邀请')
    }

    if (inviteRes.user_id === user_id) {
      return new Result(HttpCode.ERR, '不能添加自己')
    }

    /** 是否已经存在用户关系 */
    const isHaveRelation = await this.userFriendRelationEntity.findOneBy({
      user_id,
      friend_id: inviteRes.user_id
    })

    if (isHaveRelation) {
      return new Result(HttpCode.ERR, '已经是好友了')
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
  async friendList(user_id: string) {
    const friends = await this.userFriendRelationEntity.findBy({
      friend_id: user_id,
      state: FriendState.normal
    })

    if (!friends || !friends.length) {
      return new Result(HttpCode.OK, 'ok', [])
    }

    const data = await Promise.all(
      friends.map(async (item) => {
        const userInfo = this.userInfoEntity.findOne({
          where: { user_id: item.user_id },
          select: ['avatar', 'user_id', 'nick_name']
        })

        return userInfo
      })
    )

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 同意好友申请
   *
   * @param user_id 用户 id
   * @param invite_id 邀请 id
   */
  async confirmInvite(user_id: string, invite_id: string) {
    const inviteInfo = await this.userFriendInviteEntity.findOneBy({
      invite_id,
      state: FriendState.applying
    })

    if (!inviteInfo) {
      return new Result(HttpCode.ERR, '邀请不存在')
    }

    console.log(inviteInfo)

    /** 增加一条我的关系 */
    const myRelation = new UserFriendRelation()

    myRelation.friend_id = user_id
    myRelation.user_id = inviteInfo.user_id
    myRelation.state = FriendState.normal
    myRelation.created_at = new Date()

    console.log(myRelation)

    await this.userFriendRelationEntity.save(myRelation)

    /** 增加一条对方的关系 */
    const friendRelation = new UserFriendRelation()

    friendRelation.friend_id = inviteInfo.user_id
    friendRelation.user_id = user_id
    friendRelation.state = FriendState.normal
    friendRelation.created_at = new Date()

    await this.userFriendRelationEntity.save(friendRelation)

    // 将邀请数据的状态改为过期的
    inviteInfo.state = FriendState.overdue
    await this.userFriendInviteEntity.save(inviteInfo)

    return new Result(HttpCode.OK, 'ok')
  }

  /**
   * 拒绝好友申请
   *
   * @param user_id 用户 id
   * @param invite_id 邀请 id
   */
  async refuseInvite(invite_id: string) {
    const inviteInfo = await this.userFriendInviteEntity.findOneBy({
      invite_id,
      state: FriendState.applying
    })

    if (!inviteInfo) {
      return new Result(HttpCode.ERR, '邀请不存在')
    }

    inviteInfo.state = FriendState.rejected

    await this.userFriendInviteEntity.save(inviteInfo)

    return new Result(HttpCode.OK, '拒绝成功')
  }

  /**
   * 获取朋友经验排名
   *
   * @param user_id 用户 id
   */
  async getFriendExperienceRanking(user_id: string) {
    /**
     * 获取的我朋友列表
     */
    const friends = await this.userFriendRelationEntity.findBy({
      friend_id: user_id,
      state: FriendState.normal
    })

    if (!friends || !friends.length) {
      return new Result(HttpCode.OK, 'ok', [])
    }

    const data = await Promise.all(
      friends.map(async (item) => {
        /**
         * 获取当前用户身份信息
         */
        const userInfo = await this.userInfoEntity.findOneBy({
          user_id: item.user_id
        })
        /**
         * 查询当前用户当天所打卡的所有地点
         */
        const friendTodayExperience = await this.getFriendTodayExperience(
          item.user_id
        )
        /**
         * 所获经验值
         */
        const experiences = friendTodayExperience.reduce(
          (sum, item) => sum + (item.experience_value || 0),
          0
        )

        return {
          nick_name: userInfo.nick_name,
          user_id: userInfo.user_id,
          avatar: userInfo.avatar,
          experiences,
          count: friendTodayExperience.length
        }
      })
    )

    /**
     * 按照 experiences 从高到低排序
     */
    data.sort((a, b) => b.experiences - a.experiences)

    console.log('进入所有打卡记录', data)

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 查询当前用户当天所打卡的所有地点
   *
   * @param user_id 用户 id
   */
  private async getFriendTodayExperience(user_id: string) {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0) // 设置时间为当天的开始时间

    const queryBuilder = await this.userRouteEntity.createQueryBuilder(
      'userRouteEntity'
    )

    const todayRelease = await queryBuilder
      .where('userRouteEntity.user_id = :userId', { userId: user_id })
      .andWhere('userRouteEntity.create_at >= :currentDate', { currentDate })
      .getMany()

    return todayRelease
  }
}
