import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "./createOrderDetail.dto";
import { Type } from "class-transformer";


class orderDetail{
    qty:number;
    orderId:string;
    itemId:string;
    subTotal:string;
    price:string;
    orderDate:Date;
    createAt:Date;
}

export class CreateOrderDto {
    noInvoice:string

    @ApiProperty()
    name:string

    orderDate:Date
    status:string
    total:string
    createAt:Date

    @ApiProperty({type:[orderDetail]})
    @Type(() => orderDetail)
    data:[orderDetail]
}