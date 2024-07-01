import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserProvinceExperience } from './entity'
import { UserVisitedProvince } from '../gps'
import { isNumber, Result } from 'src/utils'
import { UserInfo } from '../user/entity'
import { HttpCode } from 'src/enum'

@Injectable()
export class ExperienceService {
  /**
   * @param userProvinceExperience 经验数据库
   * @param userVisitedProvince 用户访问的省份数据库
   */
  constructor(
    @InjectRepository(UserProvinceExperience)
    private readonly userProvinceExperience: Repository<UserProvinceExperience>,
    @InjectRepository(UserVisitedProvince)
    private readonly userVisitedProvince: Repository<UserVisitedProvince>,
    @InjectRepository(UserInfo)
    private readonly userInfo: Repository<UserInfo>
  ) {}

  /**
   * 收集经验
   *
   * @param id 收集经验的 id
   * @param id 用户 id
   */
  async collectExperience(id: number, user_id: string) {
    /** 通过 id 找的经验 */
    const experience = await this.userProvinceExperience.findOneBy({ id })

    experience.is_collect = '1'

    const data = await this.userProvinceExperience.save(experience)

    if (data) {
      /**
       * 获取用户当前打卡的省份信息
       *
       * 通过用户 id 和省份编码找的用户解锁的省份信息
       *
       * 给 value 添加经验值
       */
      const provinceInfo = await this.userVisitedProvince.findOneBy({
        user_id,
        province_code: data.province_code
      })

      /** 之前的经验值 */
      const oldExperienceValue = Number(
        provinceInfo ? provinceInfo.experience_value : 0
      )
      /** 本次收集的经验值 */
      const collectedExperienceValue = Number(data.value)
      /** 最新的经验值 */
      const newExperienceValue = oldExperienceValue + collectedExperienceValue

      // 三个参数必须全部是数字，避免结果为 NaN
      if (
        !isNumber(oldExperienceValue) ||
        !isNumber(collectedExperienceValue) ||
        !isNumber(newExperienceValue)
      ) {
        return new Result(HttpCode.ERR, '数据处理异常')
      }

      // 重新写入新的经验数量
      provinceInfo.experience_value = newExperienceValue

      const result = await this.userVisitedProvince.save(provinceInfo)

      if (result) {
        return new Result(HttpCode.OK, '收集成功')
      }
    }

    return new Result(HttpCode.ERR, '收集失败')
  }

  /**
   * 添加经验值
   *
   * @param user_id 用户 id
   * @param value 经验值
   * @param get_method 获取类型
   * @param province_code 省份编码
   */
  async addExperience(user_id, value, get_method, province_code) {
    const experience = new UserProvinceExperience()

    experience.created_at = new Date()
    experience.get_method = get_method
    experience.is_collect = '0'
    experience.province_code = province_code
    experience.user_id = user_id
    experience.value = value

    const newExperience = await this.userProvinceExperience.create(experience)

    const data = await this.userProvinceExperience.save(newExperience)

    if (data) {
      return new Result(HttpCode.OK, '经验获取成功', data)
    }
  }

  /**
   * 获取经验值列表
   *
   * @param user_id 用户 id
   * @param province_code 省份编码
   */
  async getExperience(user_id: string, province_code: string) {
    const data = await this.userProvinceExperience.findBy({
      user_id,
      province_code,
      is_collect: '0'
    })

    return new Result(HttpCode.OK, 'ok', data)
  }

  /**
   * 获取经验排行榜
   *
   * @param [province_code] 省份编码
   */
  async getRanking(province_code?: string) {
    const rankingList = await this.userVisitedProvince.find({
      where: { province_code },
      order: {
        experience_value: 'DESC'
      }
    })

    const data = await Promise.all(
      rankingList.map(async (item: UserVisitedProvince) => {
        /** 获取用户信息 */
        const user_info = await this.userInfo.findOne({
          where: { user_id: item.user_id },
          select: ['avatar', 'nick_name', 'gender']
        })

        return {
          ...item,
          user_info
        } as const
      })
    )

    return new Result(HttpCode.OK, 'ok', data)
  }
}
