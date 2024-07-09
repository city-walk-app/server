import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { EmailService } from '../email'
import { UserFriendRelation, UserFriendInvite } from './entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserFriendRelation, UserFriendInvite])],
  controllers: [FriendController],
  providers: [FriendService, EmailService],
  exports: [FriendService]
})
export class FriendModule {}
