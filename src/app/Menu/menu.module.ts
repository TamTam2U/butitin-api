import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../strategies';
import { MenuController } from './controller/menu.controller';
import { MenuService } from './Service/menu.service';
import { Module } from '@nestjs/common';
import { OrderDetail } from '../entity/OrderDetail';
import { Item } from '../entity/item';
import { Order } from '../entity/order';
import { Category } from '../entity/category';

@Module({
  imports: [TypeOrmModule.forFeature([Item,Order,OrderDetail,Category])],
  controllers: [MenuController],
  providers: [MenuService,JwtStrategy],
  exports:[MenuService,TypeOrmModule.forFeature([Item,Order,OrderDetail,Category])],
})
export class MenuModule {}
