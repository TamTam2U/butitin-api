import { UserController } from './Controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './Service/user.service';
import { Module } from '@nestjs/common';
import { user } from '../entity';
import { DatabaseSModule } from '../utils/database.module';
import { UserProviders } from './Provider/user.provider';

@Module({
  imports: [DatabaseSModule],
  controllers: [UserController],
  providers: [UserService,...UserProviders],
})
export class UserModule {}
