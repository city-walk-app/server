import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [AdminController],
  providers: [AdminService, EmailService],
  exports: [AdminService]
})
export class AdminModule { }
