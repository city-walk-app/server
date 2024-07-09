import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * 用户访问的省份
 */
@Entity({ name: 'cw_user_visited_province', comment: '用户访问的省份' })
export class UserVisitedProvince {
  /** 点赞 id */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 用户 id */
  @Column({ type: 'varchar', length: 255, comment: '用户 id' })
  user_id: string

  /** 访问 id */
  @Column({ type: 'varchar', length: 255, comment: '访问 id' })
  vis_id: string

  /** 省份 code */
  @Column({ type: 'varchar', length: 255, comment: '省份 code' })
  province_code: string

  /** 省份名称 */
  @Column({ type: 'varchar', length: 255, comment: '省份名称' })
  province_name: string

  /** 当前省份获取到的经验值总和 */
  @Column({ type: 'int', comment: '当前省份获取到的经验值总和' })
  experience_value: number
}
