import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'kedaibutitin',
      username: 'root',
      password: '',
      entities: ['../entities/*.entity.{ts,js}'],
      logger: 'file',
      synchronize: true,
    };
  }
}