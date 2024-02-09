import { UserController } from './Controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './Service/user.service';
import { Module } from '@nestjs/common';
import { JwtStrategy } from '../strategies';
import { User } from '../entity/user';
// import { DatabaseSModule } from '../utils/database.module';
// import { UserProviders } from './Provider/user.provider';
// import { JwtStrategy } from '../strategies/jwt-strategy';
// import { LocalStrategy } from '../strategies/local-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
