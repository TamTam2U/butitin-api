// import { Injectable } from '@nestjs/common';
// import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Applicant } from '../entity/output/entities/Applicant';

// @Injectable()
// export class TypeOrmService implements TypeOrmOptionsFactory {

//   public createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       type: 'mysql',
//       host: 'localhost',
//       port: 3306,
//       database: 'butitin',
//       username: 'root',
//       password: '',
//       entities: [Applicant],
//       logger: 'file',
//       // synchronize: true,
//     };
//   }
// }