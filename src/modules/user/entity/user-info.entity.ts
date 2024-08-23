import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'
import { Gender } from 'src/enum'

/**
 * TypeORM 是一个强大的对象关系映射器，支持多种关系数据库。
 *
 * @see github https://github.com/typeorm/typeorm
 */

/**
 * 用户表
 */
@Entity({ name: 'cw_user_info', comment: '用户表' })
export class UserInfo {
  /** 自增列 */
  @PrimaryGeneratedColumn({ type: 'int', comment: 'id' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar', length: 255, comment: '用户 id' })
  user_id: string

  /** 昵称 */
  @Column({ type: 'varchar', length: 255, comment: '昵称' })
  nick_name: string

  /** 邮箱 */
  @Column({ type: 'varchar', length: 255, comment: '邮箱' })
  email: string

  /** 手机号 */
  @Column({ type: 'varchar', length: 255, comment: '手机号' })
  mobile: string

  /** 微信 open id */
  @Column({ type: 'varchar', length: 255, comment: '微信 open id' })
  wx_open_id: string

  /** 头像 */
  @Column({ type: 'varchar', length: 255, comment: '头像' })
  avatar: string

  /** 个性签名 */
  @Column({ type: 'varchar', length: 255, comment: '个性签名' })
  signature: string

  /** 省份 */
  @Column({ type: 'varchar', length: 255, comment: '省份' })
  province: string

  /** 城市 */
  @Column({ type: 'varchar', length: 255, comment: '城市' })
  city: string

  /** 注册时间 */
  @CreateDateColumn({ type: 'datetime', comment: '注册时间' })
  created_at: Date

  /** 生日 */
  @Column({ type: 'varchar', length: 255, comment: '生日' })
  birthday: string

  /**
   * 性别
   *
   * 0-不愿透露 1-男 2-女
   */
  @Column({ type: 'varchar', length: 255, comment: '性别', enum: Gender })
  gender: string

  /** ip 归属地 */
  @Column({ type: 'varchar', length: 255, comment: 'ip 归属地' })
  ip_address: string

  /** ip 详细信息 */
  @Column({ type: 'varchar', length: 255, comment: 'ip 详细信息' })
  ip_info: string
}
