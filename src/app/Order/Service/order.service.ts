import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from 'src/app/Menu/Service/menu.service';
import { Order } from 'src/app/entity/Order';
import { OrderDetail } from 'src/app/entity/OrderDetail';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateOrderDto } from '../dtos/createOrder.dto';
import { InvoiceNumber } from 'invoice-number';
import { CreateOrderDetailDto } from '../dtos/createOrderDetail.dto';

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
            if(order.status === 'paid'){
                throw new NotFoundException('Order Sudah Dibayar');
            }else{
                order.status = 'rejected';
                return await this.orderRepository.save(order);
            }
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
        await queryRunner.connect();
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
                for(let i = 0; i < newOrder.data.length; i++){
                    const cekItem = await this.menuService.findOneItem(newOrder.data[i].itemId);
                    if(cekItem){
                        newOrder.data[i].itemId = cekItem.id;
                    }else{
                        throw new NotFoundException('Item Tidak Ditemukan');
                    }
                    const orderDetailData = new OrderDetail();
                    if(cekItem.stock <= 0){
                        throw new NotFoundException('Stok Item Habis');
                    }else if(cekItem.stock < newOrder.data[i].qty){
                        await queryRunner.rollbackTransaction();
                        throw new NotFoundException('Stok Item Kurang');
                    }else{
                        cekItem.stock = cekItem.stock - newOrder.data[i].qty; 
                        orderDetailData.quantity = newOrder.data[i].qty;
                    }
                    await this.menuService.editItem(newOrder.data[i].itemId,cekItem);
                    newOrder.data[i].orderId = order.id;
                    let subTotal = Number(cekItem.price) * newOrder.data[i].qty;
                    newOrder.data[i].subTotal = subTotal.toString();
                    newOrder.data[i].price = cekItem.price;
                    newOrder.data[i].orderDate = order.orderDate;
                    newOrder.data[i].createAt = new Date();
                    for(const key in newOrder.data[i]){
                        orderDetailData[key] = newOrder.data[i][key];
                        
                    }
                    await this.orderDetailRepository.save(orderDetailData);
                }
                await queryRunner.commitTransaction();
                return order;
            }else{
                await queryRunner.rollbackTransaction();
                throw new Error('Error');
            }
        }catch(e){
            await queryRunner.rollbackTransaction();
            throw new Error(e);
        }finally{
            await queryRunner.release();
        }
    }
}


