import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./OrderDetail";

@Entity("order", { schema: "butitin" })
export class Order {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "noInvoice", length: 255 })
  noInvoice: string;

  @Column("varchar", { name: "orderDate", length: 255 })
  orderDate: Date;

  @Column("varchar", {
    name: "status",
    length: 255,
    default: () => "'pending'",
  })
  status: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "total", length: 255 })
  total: string;

  @Column("varchar", { name: "createAt", length: 255 })
  createAt: Date | string;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  updateAt: Date | null  | string;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  @DeleteDateColumn()
  deleteAt: string | null | Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
