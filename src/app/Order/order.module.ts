import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './Controller/order.controller';
import { OrderService } from './Service/order.service';
import { Module } from '@nestjs/common';
import { Order } from '../entity/Order';
import { OrderDetail } from '../entity/OrderDetail';
import { MenuModule } from '../Menu/menu.module';
import { MenuService } from '../Menu/Service/menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderDetail]),MenuModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService,TypeOrmModule.forFeature([Order,OrderDetail]),MenuModule],
})
export class OrderModule {}
