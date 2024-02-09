import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './Controller/order.controller';
import { OrderService } from './Service/order.service';
import { Module } from '@nestjs/common';
import { OrderDetail } from '../entity/OrderDetail';
import { MenuModule } from '../Menu/menu.module';
import { Order } from '../entity/order';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail]), MenuModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [
    OrderService,
    TypeOrmModule.forFeature([Order, OrderDetail]),
    MenuModule,
  ],
})
export class OrderModule {}
