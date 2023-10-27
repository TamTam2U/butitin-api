import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface order_detailAttributes {
    id?: number;
    orderId: number;
    itemId: number;
    quantity: number;
    subTotal: string;
    createAt: string;
    updateAt?: string;
    deleteAt?: string;
}

@Table({ tableName: "order_detail", timestamps: false })
export class order_detail extends Model<order_detailAttributes, order_detailAttributes> implements order_detailAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    id?: number;
    @Column({ type: DataType.BIGINT })
    orderId!: number;
    @Column({ type: DataType.BIGINT })
    itemId!: number;
    @Column({ type: DataType.INTEGER })
    quantity!: number;
    @Column({ type: DataType.STRING(255) })
    subTotal!: string;
    @Column({ type: DataType.STRING(255) })
    createAt!: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    updateAt?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    deleteAt?: string;
}