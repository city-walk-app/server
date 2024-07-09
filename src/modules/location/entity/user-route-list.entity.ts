import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

/**
 * 用户步行地址信息详情列表
 */
@Entity({ name: 'cw_user_route_list', comment: '用户步行地址信息详情列表' })
export class UserRouteList {
  /** id */
  @PrimaryGeneratedColumn({ type: 'int', comment: 'id' })
  id: number

  /** 列表 id */
  @Column({ type: 'varchar', length: 255, comment: '列表 id' })
  list_id: string

  /** 用户 id */
  @Column({ type: 'varchar', length: 255, comment: '用户 id' })
  user_id: string

  /** 创建时间 */
  @CreateDateColumn({
    type: 'datetime',
    default: new Date(),
    comment: '创建时间'
  })
  create_at: Date
}
