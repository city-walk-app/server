import { Module } from '@nestjs/common'
import { WxService } from './wx.service'
import { WxController } from './wx.controller'
import { HttpModule } from '@nestjs/axios'
import { UserInfo } from '../user'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), HttpModule],
  controllers: [WxController],
  providers: [WxService],
  exports: [WxService]
})
export class WxModule {}
