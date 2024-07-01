import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import { GpsService } from './gps.service'
import { GpsController } from './gps.controller'
import { UserProvinceExperience } from '../experience/entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserVisitedProvince,
      UserRoute,
      UserRouteList,
      UserProvinceExperience
    ])
  ],
  controllers: [GpsController],
  providers: [GpsService],
  exports: [GpsService]
})
export class GpsModule {}
