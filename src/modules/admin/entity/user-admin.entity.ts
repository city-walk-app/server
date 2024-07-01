import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

/**
 * 用户表
 */
@Entity('cw_user_admin')
export class UserAdmin {
  /** 自增列 */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  /** 邮箱 */
  @Column({ type: 'varchar', length: 255 })
  email: string
}
