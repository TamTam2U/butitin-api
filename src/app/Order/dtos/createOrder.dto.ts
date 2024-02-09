import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class orderDetail {
  qty: number;
  orderId: string;
  itemId: string;
  subTotal: string;
  price: string;
  orderDate: string;
  createAt: Date;
}

export class CreateOrderDto {
  noInvoice: string;

  @ApiProperty()
  name: string;

  orderDate: string;
  status: string;
  total: string;
  createAt: Date;

  @ApiProperty({ type: [orderDetail] })
  @Type(() => orderDetail)
  data: [orderDetail];
}
