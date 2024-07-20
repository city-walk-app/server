import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UniversalService } from './universal.service'
import { UniversalController } from './universal.controller'
import { EmailService } from '../email'
import { UserInfo } from '../user'
import { OssService } from 'src/service'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  controllers: [UniversalController],
  providers: [UniversalService, EmailService, OssService, UserInfo],
  exports: [UniversalService]
})
export class UniversalModule {}
