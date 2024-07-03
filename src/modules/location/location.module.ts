import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationService } from './location.service'
import { LocationController } from './location.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'
import { UserAdmin } from './entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, UserAdmin])],
  controllers: [LocationController],
  providers: [LocationService, EmailService],
  exports: [LocationService]
})
export class LocationModule {}
