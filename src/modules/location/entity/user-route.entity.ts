import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

/**
 * 用户步行地址信息详情
 */
@Entity('cw_user_route')
export class UserRoute {
  /** id */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar' })
  user_id: string

  /** 用户 id */
  @Column({ type: 'varchar' })
  list_id: string

  /** 创建时间 */
  @CreateDateColumn({ type: 'datetime', default: new Date() })
  create_at: Date

  /** 城市 */
  @Column({ type: 'varchar' })
  city: string

  /** 当前省份 */
  @Column({ type: 'varchar' })
  province: string

  /** 详细地址 */
  @Column({ type: 'varchar' })
  address: string

  /** 纬度 */
  @Column({ type: 'varchar' })
  latitude: number

  /** 经度 */
  @Column({ type: 'varchar' })
  longitude: number

  /** 地点 */
  @Column({ type: 'varchar' })
  name: string

  /** 省份编码 */
  @Column({ type: 'varchar' })
  province_code: string
}
