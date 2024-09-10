import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'
import { TravelType, MoodColor } from 'src/enum'

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

  /** 步行 id */
  @Column({ type: 'varchar', length: 255, comment: '步行 id' })
  route_id: string

  /** 省份编码 */
  @Column({ type: 'varchar', length: 255, comment: '省份编码' })
  province_code: string

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

  /** 省份 */
  @Column({ type: 'varchar', length: 255, comment: '当前省份' })
  province: string

  /** 纬度 */
  @Column({ type: 'varchar', length: 255, comment: '纬度' })
  latitude: string

  /** 经度 */
  @Column({ type: 'varchar', length: 255, comment: '经度' })
  longitude: string

  /** 所获得的经验值 */
  @Column({ type: 'int', comment: '所获得的经验值' })
  experience_value: number

  /** 发布的内容 */
  @Column({ type: 'varchar', length: 255, comment: '发布的内容' })
  content: string

  /** 详细地址 */
  @Column({ type: 'varchar', length: 255, comment: '详细地址' })
  address: string

  /** 照片 */
  @Column({ type: 'varchar', length: 255, comment: '照片' })
  picture: string

  /** 出行方式 */
  @Column({
    type: 'varchar',
    length: 255,
    comment: '出行方式',
    enum: TravelType
  })
  travel_type: TravelType

  /** 心情颜色 */
  @Column({
    type: 'varchar',
    length: 255,
    comment: '心情颜色',
    enum: MoodColor
  })
  mood_color: MoodColor
}
