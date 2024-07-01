import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

/**
 * 数据库模型
 *
 * @see entities https://typeorm.devjs.cn/entities
 */

/**
 * 经验列表
 */
@Entity('cw_user_province_experience')
export class UserProvinceExperience {
  /** id */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 省份编码 */
  @Column({ type: 'varchar', length: 255 })
  province_code: string

  /** 作者 id */
  @Column({ type: 'varchar' })
  user_id: string

  /** 获得时间 */
  @CreateDateColumn({ type: 'datetime', default: new Date() })
  created_at: Date

  /** 经验值 */
  @Column({ type: 'int' })
  value: string

  /**
   * 获取方式
   *
   * article 发布文章
   * clock_location 打卡位置
   * give 收到赠送
   */
  @Column({
    type: 'varchar',
    length: 255,
    enum: ['article', 'clock_location', 'give']
  })
  get_method: string

  /**
   * 是否收集
   *
   * 0 是未收集，1 是已收集
   */
  @Column({ type: 'varchar', length: 255, enum: ['0', '1'] })
  is_collect: string
}
