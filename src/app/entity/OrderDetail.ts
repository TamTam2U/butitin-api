import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order";
import { Item } from "./item";

@Index("itemId", ["itemId"], {})
@Index("orderId", ["orderId"], {})
@Entity("order_detail", { schema: "butitin" })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "orderId" })
  orderId: string;

  @Column("bigint", { name: "itemId" })
  itemId: string;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("varchar", { name: "subTotal", length: 255 })
  subTotal: string;

  @Column("varchar", { name: "orderDate", length: 255 })
  orderDate: string;

  @Column("varchar", { name: "createAt", length: 255 })
  createAt: string | Date;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  @UpdateDateColumn()
  updateAt: string | null | Date;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  @DeleteDateColumn()
  deleteAt: string | null | Date;

  @Column("varchar", { name: "price", nullable: true, length: 255 })
  price: string | null;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Order;

  @ManyToOne(() => Item, (item) => item.orderDetails, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "itemId", referencedColumnName: "id" }])
  item: Item;
}
