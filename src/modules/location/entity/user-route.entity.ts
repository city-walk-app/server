import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

/**
 * 用户步行地址信息详情
 */
@Entity({ name: 'cw_user_route', comment: '用户步行地址信息详情' })
export class UserRoute {
  /** id */
  @PrimaryGeneratedColumn({ type: 'int', comment: 'id' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar', length: 255, comment: '用户 id' })
  user_id: string

  /** 列表 id */
  @Column({ type: 'varchar', length: 255, comment: '列表 id' })
  list_id: string

  /** 创建时间 */
  @CreateDateColumn({
    type: 'datetime',
    default: new Date(),
    comment: '创建时间'
  })
  create_at: Date

  /** 城市 */
  @Column({ type: 'varchar', length: 255, comment: '城市' })
  city: string

  /** 当前省份 */
  @Column({ type: 'varchar', length: 255, comment: '当前省份' })
  province: string

  /** 详细地址 */
  @Column({ type: 'varchar', length: 255, comment: '详细地址' })
  address: string

  /** 纬度 */
  @Column({ type: 'varchar', length: 255, comment: '纬度' })
  latitude: number

  /** 经度 */
  @Column({ type: 'varchar', length: 255, comment: '经度' })
  longitude: number

  /** 地点 */
  @Column({ type: 'varchar', length: 255, comment: '地点' })
  name: string

  /** 省份编码 */
  @Column({ type: 'varchar', length: 255, comment: '省份编码' })
  province_code: string
}
