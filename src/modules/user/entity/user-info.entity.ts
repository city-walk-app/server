import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

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
  @Column({ type: 'varchar', length: 255 })
  email: string

  /** 手机号 */
  @Column({ type: 'varchar', length: 255 })
  mobile: string

  /** 头像 */
  @Column({ type: 'varchar', length: 255 })
  avatar: string

  /** 个性签名 */
  @Column({ type: 'varchar', length: 255 })
  signature: string

  /** 省份 */
  @Column({ type: 'varchar', length: 255 })
  province: string

  /** 城市 */
  @Column({ type: 'varchar', length: 255 })
  city: string

  /** 注册时间 */
  @CreateDateColumn({ type: 'datetime', comment: '注册时间' })
  created_at: Date

  /** 生日 */
  @Column({ type: 'varchar', length: 255 })
  birthday: string

  /** 性别 */
  @Column({ type: 'varchar', length: 255 })
  gender: string

  /** ip 归属地 */
  @Column({ type: 'varchar', length: 255 })
  ip_address: string

  /** ip 详细信息 */
  @Column({ type: 'varchar', length: 255 })
  ip_info: string

  /** 偏好类型 */
  @Column({ type: 'varchar', length: 255 })
  preference_type: string
}
