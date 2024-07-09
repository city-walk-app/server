import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

/**
 * 用户好友关系
 */
@Entity({ name: 'cw_user_friend_relation', comment: '用户好友关系' })
export class UserFriendRelation {
  /** 自增列 */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar', length: 255 })
  user_id: string

  /** 朋友 id */
  @Column({ type: 'varchar', length: 255 })
  friend_id: string

  /** 邀请时间 */
  @CreateDateColumn({ type: 'datetime', comment: '注册时间' })
  created_at: Date

  /** 邀请状态 */
  @Column({ type: 'varchar', length: 255 })
  state: string
}
