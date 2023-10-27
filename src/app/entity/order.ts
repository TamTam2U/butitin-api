import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface orderAttributes {
    id?: number;
    noInvoice: string;
    orderDate: string;
    status?: string;
    name: string;
    total: string;
    createAt: string;
    updateAt?: string;
    deleteAt?: string;
}

@Table({ tableName: "order", timestamps: false })
export class order extends Model<orderAttributes, orderAttributes> implements orderAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    id?: number;
    @Column({ type: DataType.STRING(255) })
    noInvoice!: string;
    @Column({ type: DataType.STRING(255) })
    orderDate!: string;
    @Column({ type: DataType.STRING(255), defaultValue: "pending" })
    status?: string;
    @Column({ type: DataType.STRING(255) })
    name!: string;
    @Column({ type: DataType.STRING(255) })
    total!: string;
    @Column({ type: DataType.STRING(255) })
    createAt!: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    updateAt?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    deleteAt?: string;
}