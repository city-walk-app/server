import { Module } from '@nestjs/common'
import { WxService } from './wx.service'
import { WxController } from './wx.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [WxController],
  providers: [WxService],
  exports: [WxService]
})
export class WxModule {}
