import { Sequelize } from 'sequelize-typescript';
import { user } from '../entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'kedaibutitin',
      });
      sequelize.addModels([user]);
      await sequelize.sync();
      return sequelize;
    },
  },
];