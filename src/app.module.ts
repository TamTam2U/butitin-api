import { ApplicantModule } from './app/Applicant/applicant.module';
import { MenuModule } from './app/Menu/menu.module';
import { AuthModule } from './app/auth/auth.module';
import { DatabaseSModule } from './app/utils/database.module';
import { UserModule } from './app/User/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './app/entity';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './app/User/Service/user.service';
import { TypeOrmService } from './app/utils/typeorm.service';

@Module({
  imports: [
    ApplicantModule,
    MenuModule,
    AuthModule,
    DatabaseSModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
