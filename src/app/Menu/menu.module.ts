import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../strategies';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './Service/menu.service';
import { Module } from '@nestjs/common';
import { Item } from '../entity/Item';
import { Order } from '../entity/Order';
import { OrderDetail } from '../entity/OrderDetail';
import { Category } from '../entity/Category';

@Module({
  imports: [TypeOrmModule.forFeature([Item,Order,OrderDetail,Category])],
  controllers: [MenuController],
  providers: [MenuService,JwtStrategy],
  exports:[MenuService,TypeOrmModule.forFeature([Item,Order,OrderDetail,Category])],
})
export class MenuModule {}
