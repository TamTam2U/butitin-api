import { Applicant } from "src/app/entity/Applicant";
import { Category } from "src/app/entity/Category";
import { Item } from "src/app/entity/Item";
import { Order } from "src/app/entity/Order";
import { OrderDetail } from "src/app/entity/OrderDetail";
import { User } from "src/app/entity/User";

export const Configuration = () => ({
  database: {
    port: process.env.DB_PORT || 3306,
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',

    password: process.env.DB_PASSWORD || '',
    username: process.env.DB_USERNAME || 'root',
    database: process.env.DB_DATABASE || 'butitin',

    synchronize:false,
    entities: [User,Applicant,Order,OrderDetail,Item,Category],
  },
});
