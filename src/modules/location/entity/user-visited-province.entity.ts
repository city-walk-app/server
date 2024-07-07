import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * 用户访问的省份
 */
@Entity('cw_user_visited_province')
export class UserVisitedProvince {
  /** 点赞 id */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar' })
  user_id: string

  /** 访问 id */
  @Column({ type: 'varchar' })
  vis_id: string

  /** 省份 code */
  @Column({ type: 'varchar' })
  province_code: string

  /** 省份名称 */
  @Column({ type: 'varchar' })
  province_name: string

  /** 当前省份获取到的经验值总和 */
  @Column({ type: 'int' })
  experience_value: number
}
