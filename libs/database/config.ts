import { OrderDetail } from 'src/app/entity/OrderDetail';
import { Applicant } from 'src/app/entity/applicant';
import { Category } from 'src/app/entity/category';
import { Item } from 'src/app/entity/item';
import { Order } from 'src/app/entity/order';
import { User } from 'src/app/entity/user';

export const Configuration = () => ({
  database: {
    port: process.env.DB_PORT || 3306,
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',

    password: process.env.DB_PASSWORD || '',
    username: process.env.DB_USERNAME || 'root',
    database: process.env.DB_DATABASE || 'butitin',

    synchronize: false,
    entities: [User, Applicant, Order, OrderDetail, Item, Category],
  },
});
