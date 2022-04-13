/*
 * @Author: 王鑫
 * @Description:
 * @Date: 2022-04-12 10:26:01
 */
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LocalStorage } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStorage } from './jwt.strategy';
import { jwtContants } from './jwt.contants';

const jwtModule = JwtModule.register({
  secret: jwtContants.secret,
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [UserController],
  providers: [UserService, LocalStorage, JwtStorage],
  exports: [jwtModule, UserService],
})
export class UserModule {}
