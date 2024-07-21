import { Module } from '@nestjs/common'
import { UniversalService } from './universal.service'
import { UniversalController } from './universal.controller'
import { OssService } from 'src/service'

@Module({
  controllers: [UniversalController],
  providers: [UniversalService, OssService],
  exports: [UniversalService]
})
export class UniversalModule {}
