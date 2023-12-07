import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    noInvoice:string

    @ApiProperty()
    name:string

    orderDate:Date
    status:string
    total:string
    createAt:Date
}