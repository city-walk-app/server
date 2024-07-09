import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * 后台表
 */
@Entity({ name: 'cw_user_admin', comment: '后台表' })
export class UserAdmin {
  /** 自增列 */
  @PrimaryGeneratedColumn({ type: 'int', comment: 'id' })
  id: number

  /** 邮箱 */
  @Column({ type: 'varchar', length: 255, comment: '邮箱' })
  email: string
}
