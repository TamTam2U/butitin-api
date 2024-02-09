import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDto {
  @ApiProperty()
  qty: number;

  orderId: string;
  itemId: string;

  @ApiProperty()
  subTotal: string;

  price: string;
  orderDate: Date;
  createAt: Date;
}
