import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from 'src/app/Menu/Service/menu.service';
import { Order } from 'src/app/entity/Order';
import { OrderDetail } from 'src/app/entity/OrderDetail';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { InvoiceNumber } from 'invoice-number';

@Injectable()
export class OrderService {
    private static invoiceNumber = 0;
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,@InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>,private menuService: MenuService,private dataSource: DataSource){}

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

    async findAllOrderByStatusPending(): Promise<Order[]> {
        return await this.orderRepository.find({ where: { status: 'pending', deleteAt: null } });
    }

    async findAllOrderByStatusRejected(): Promise<Order[]> {
        return await this.orderRepository.find({ where: { status: 'rejected', deleteAt: null } });
    }

    async findAllOrderByStatusAccepted(): Promise<Order[]> {
        return await this.orderRepository.find({ where: { status: 'accepted', deleteAt: null } });
    }

    async findAllOrderByStatusPaid(): Promise<Order[]> {
        return await this.orderRepository.find({ where: { status: 'paid', deleteAt: null } });
    }

    async findOneOrderByIdStatusPending(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: id, status: 'pending', deleteAt: null },
        });
        if (!order) throw new NotFoundException('Order Tidak Ditemukan');
        return order;
    }

    async findOneOrderByIdStatusRejected(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: id, status: 'rejected', deleteAt: null },
        });
        if (!order) throw new NotFoundException('Order Tidak Ditemukan');
        return order;
    }

    async findOneOrderByIdStatusAccepted(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: id, status: 'accepted', deleteAt: null },
        });
        if (!order) throw new NotFoundException('Order Tidak Ditemukan');
        return order;
    }

    async findOneOrderByIdStatusPaid(id: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id: id, status: 'paid', deleteAt: null },
        });
        if (!order) throw new NotFoundException('Order Tidak Ditemukan');
        return order;
    }

    async setStatusPaid(id: string): Promise<Order> {
        const order = await this.findOneOrderByIdStatusAccepted(id);
        if(order){
            order.status = 'paid';
            return await this.orderRepository.save(order);
        }else{
            throw new NotFoundException('Order Belum Diterima');
        }
    }

    async setStatusRejected(id: string): Promise<Order> {
        const order = await this.findOneOrder(id);
        if(order){
            order.status = 'rejected';
            return await this.orderRepository.save(order);
        }else{
            throw new NotFoundException('Order Tidak Ditemukan');
        }
    }

    async setStatusAccepted(id: string): Promise<Order> {
        const order = await this.findOneOrderByIdStatusPending(id);
        if(order){
            order.status = 'accepted';
            return await this.orderRepository.save(order);
        }else{
            throw new NotFoundException('Order Tidak Ditemukan');
        }
    }

    static generateInvoiceNumber(prefix: string): string {
        this.invoiceNumber++;
        return prefix + this.padNumber(this.invoiceNumber, 5);
    }

    static padNumber(num: number, length: number): string {
        return String(num).padStart(length, '0');
    }

    async createOrder(newOrder: CreateOrderDto): Promise<Order | any | QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction()
        try{
            const order = new Order();
            const prefix = 'BT-';
            order.noInvoice = OrderService.generateInvoiceNumber(prefix);
            order.status = 'pending';
            order.total = '0';
            order.orderDate = new Date();
            order.createAt = new Date();
            for (const key in newOrder) {
                order[key] = newOrder[key];
            }
            if(await this.orderRepository.save(order)){
                await queryRunner.commitTransaction();
            }else{
                await queryRunner.rollbackTransaction();
            }
        }catch(e){
            await queryRunner.rollbackTransaction();
            throw e;
        }
    }
}


