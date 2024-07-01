import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'
import { UserAdmin } from './entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, UserAdmin])],
  controllers: [AdminController],
  providers: [AdminService, EmailService],
  exports: [AdminService]
})
export class AdminModule {}
