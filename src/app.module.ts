import { DatabaseSModule } from './app/utils/database.module';
import { UserModule } from './app/User/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './app/entity';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './app/User/Service/user.service';
import { TypeOrmService } from './app/utils/typeorm.service';

@Module({
  imports: [DatabaseSModule, UserModule,ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
