import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { OrderService } from '../Service/order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '../dtos/createOrder.dto';

@ApiTags('Order')
@Controller('/api/order')
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

    @Get('/all/order/pending')
    async findAllOrderByStatusPending() {
        return await this.orderService.findAllOrderByStatusPending();
    }

    @Get('/all/order/rejected')
    async findAllOrderByStatusRejected() {
        return await this.orderService.findAllOrderByStatusRejected();
    }

    @Get('/all/order/accepted')
    async findAllOrderByStatusAccepted() {
        return await this.orderService.findAllOrderByStatusAccepted();
    }

    @Get('/all/order/paid')
    async findAllOrderByStatusPaid() {
        return await this.orderService.findAllOrderByStatusPaid();
    }

    @Get('/one/order/pending/:id')
    async findOneOrderByIdStatusPending(@Param('id') id: string) {
        return await this.orderService.findOneOrderByIdStatusPending(id);
    }

    @Get('/one/order/rejected/:id')
    async findOneOrderByIdStatusRejected(@Param('id') id: string) {
        return await this.orderService.findOneOrderByIdStatusRejected(id);
    }

    @Get('/one/order/accepted/:id')
    async findOneOrderByIdStatusAccepted(@Param('id') id: string) {
        return await this.orderService.findOneOrderByIdStatusAccepted(id);
    }

    @Get('/one/order/paid/:id')
    async findOneOrderByIdStatusPaid(@Param('id') id: string) {
        return await this.orderService.findOneOrderByIdStatusPaid(id);
    }

    @Put('/setStatusAccepted/:id')
    async setStatusAccepted(@Param('id') id: string) {
        return await this.orderService.setStatusAccepted(id);
    }

    @Put('/setStatusRejected/:id')
    async setStatusRejected(@Param('id') id: string) {
        return await this.orderService.setStatusRejected(id);
    }

    @Put('/setStatusPaid/:id')
    async setStatusPaid(@Param('id') id: string) {
        return await this.orderService.setStatusPaid(id);
    }
}
