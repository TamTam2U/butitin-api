
import { UserModule } from './app/User/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './app/User/Service/user.service';
import { DatabaseModule } from 'libs/database/database.module';
import { Configuration, TypeOrmConfig } from 'libs/database';
import { AuthModule } from './app/auth/auth.module';
import { ApplicantModule } from './app/Applicant/applicant.module';
import { MenuModule } from './app/Menu/menu.module';

@Module({
  imports: [
    ApplicantModule,
    MenuModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, load: [Configuration] }),TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useClass:TypeOrmConfig,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
