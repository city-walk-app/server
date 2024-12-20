import { Module, Global } from '@nestjs/common'
import { OssService } from './oss.service'

@Global()
@Module({
  providers: [OssService],
  exports: [OssService]
})
export class OssModule {}
