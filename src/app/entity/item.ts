import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category";
import { OrderDetail } from "./OrderDetail";

@Index("categoryId", ["categoryId"], {})
@Entity("item", { schema: "butitin" })
export class Item {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "categoryId" })
  categoryId: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("longtext", { name: "deskripsi", nullable: true })
  deskripsi: string | null;

  @Column("varchar", { name: "price", length: 255 })
  price: string;

  @Column("int", { name: "stock" })
  stock: number;

  @Column("varchar", { name: "gambar", length: 255 })
  gambar: string;

  @Column("varchar", { name: "createAt", length: 255 })
  @CreateDateColumn()
  createAt: string | Date;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  @UpdateDateColumn()
  updateAt: string | null | Date;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  @DeleteDateColumn()
  deleteAt: string | null | Date;

  @ManyToOne(() => Category, (category) => category.items, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.item)
  orderDetails: OrderDetail[];
}
