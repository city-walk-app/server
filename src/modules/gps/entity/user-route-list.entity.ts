import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

/**
 * 用户步行地址信息详情列表
 */
@Entity('cw_user_route_list')
export class UserRouteList {
  /** id */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar' })
  user_id: string

  /** 创建时间 */
  @CreateDateColumn({ type: 'datetime', default: new Date() })
  create_at: Date
}
