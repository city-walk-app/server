import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserInfo } from './entity'
import { UserController } from './user.controller'
import { EmailService } from '../email'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('DB_TOKEN_KEY')
      // signOptions: { expiresIn: '4h' }
    }
  }
})

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo]), jwtModule],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService]
})
export class UserModule {}
