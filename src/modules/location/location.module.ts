import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationService } from './location.service'
import { LocationController } from './location.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'
import { UserVisitedProvince, UserRoute, UserRouteList } from './entity'
import { JwtModule } from '@nestjs/jwt'
import { HttpModule } from '@nestjs/axios'
import { LoggerService } from 'src/common'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserVisitedProvince,
      UserRoute,
      UserRouteList
    ]),
    JwtModule,
    HttpModule
  ],
  controllers: [LocationController],
  providers: [LocationService, EmailService, LoggerService],
  exports: [LocationService]
})
export class LocationModule { }
