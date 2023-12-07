import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from 'src/app/Menu/Service/menu.service';
import { Order } from 'src/app/entity/Order';
import { OrderDetail } from 'src/app/entity/OrderDetail';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { InvoiceNumber } from 'invoice-number';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,@InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,private menuService: MenuService){}

    async findAllOrder(): Promise<Order[]> {
        return await this.orderRepository.find({ where: { deleteAt: null } });
    }

    async findOneOrder(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: id, deleteAt: null },
        });
        if (!order) throw new NotFoundException('Order Tidak Ditemukan');
        return order;
    }

    async createOrder(newOrder: CreateOrderDto): Promise<Order | any> {
        try{
            const order = new Order();
            let inv = '00000';
            order.noInvoice = InvoiceNumber.next('BT-' + inv + 1);
            order.createAt = new Date();
            order.status = 'pending';
            order.total = '0';
            order.orderDate = new Date();
            for (const key in newOrder) {
                order[key] = newOrder[key];
            }
            if(await this.orderRepository.save(order)){
                return order
            }else{
                throw new Error('Gagal Membuat Order')
            }
        }catch(error){
            return error
        }
    }


}


