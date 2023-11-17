import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Item } from "./Item";

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
  createAt: string;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  updateAt: string | null;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  deleteAt: string | null;

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
