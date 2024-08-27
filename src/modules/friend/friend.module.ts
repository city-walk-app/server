import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { EmailService } from '../email'
import { UserFriendRelation, UserFriendInvite } from './entity'
import { UserInfo } from '../user'
import { UserRoute } from '../location'
import { LoggerService } from 'src/common'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserFriendRelation,
      UserFriendInvite,
      UserInfo,
      UserRoute
    ])
  ],
  controllers: [FriendController],
  providers: [FriendService, EmailService, LoggerService],
  exports: [FriendService]
})
export class FriendModule {}
