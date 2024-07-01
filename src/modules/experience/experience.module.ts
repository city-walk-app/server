import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExperienceService } from './experience.service'
import { ExperienceController } from './experience.controller'
import { UserProvinceExperience } from './entity'
import { UserVisitedProvince } from '../gps'
import { UserInfo } from '../user'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserProvinceExperience,
      UserVisitedProvince,
      UserInfo
    ])
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService]
})
export class ExperienceModule {}
