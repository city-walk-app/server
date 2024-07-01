import { IsString, IsOptional, Matches, Length } from 'class-validator'

export class SetUserInfoDTO {
  /** 手机号 */
  @IsOptional()
  @IsString()
  @Matches(/^[1][3-9][0-9]{9}$/, { message: '手机号格式不正确' })
  mobile?: string

  /** 昵称 */
  @IsOptional()
  @IsString()
  @Length(1, 16, { message: '昵称长度不规范' })
  nick_name?: string

  /** 个性签名 */
  @IsOptional()
  @IsString()
  @Length(1, 30, { message: '签名长度不规范' })
  signature?: string

  /** 省份 */
  @IsOptional()
  @IsString()
  province?: string

  /** 城市 */
  @IsOptional()
  @IsString()
  city?: string

  /** 生日 */
  @IsOptional()
  @IsString()
  birthday?: string

  /** 性别 */
  @IsOptional()
  @IsString()
  gender?: string
}
