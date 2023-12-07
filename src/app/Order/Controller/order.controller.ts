import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { OrderService } from '../Service/order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../dtos/createOrder.dto';

@ApiTags('Order')
@Controller()
export class OrderController {
    constructor(private readonly orderService: OrderService) {}


    @Get('/allOrder')
    async findAllOrder() {
        return await this.orderService.findAllOrder();
    }

    @Get('/oneOrder/:id')
    async findOneOrder(@Param('id') id: string) {
        return await this.orderService.findOneOrder(id);
    }

    @Post('/createOrder')
    async createOrder(@Body() newOrder:CreateOrderDto) {
        return await this.orderService.createOrder(newOrder);
    }
}
