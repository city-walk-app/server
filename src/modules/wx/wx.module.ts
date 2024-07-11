import { Module } from '@nestjs/common'
import { WxService } from './wx.service'
import { WxController } from './wx.controller'
import { HttpModule } from '@nestjs/axios'
import { UserService } from '../user'
import { UserInfo } from '../user'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), HttpModule],
  controllers: [WxController],
  providers: [WxService, UserService, JwtService],
  exports: [WxService]
})
export class WxModule {}
