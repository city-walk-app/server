import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'
import { UserAdmin } from './entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, UserAdmin])],
  controllers: [FriendController],
  providers: [FriendService, EmailService],
  exports: [FriendService]
})
export class FriendModule { }
