import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface categoryAttributes {
    id?: number;
    name: string;
    createAt: string;
    updateAt?: string;
    deleteAt?: string;
}

@Table({ tableName: "category", timestamps: false })
export class category extends Model<categoryAttributes, categoryAttributes> implements categoryAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    id?: number;
    @Column({ type: DataType.STRING(255) })
    name!: string;
    @Column({ type: DataType.STRING(255) })
    createAt!: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    updateAt?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    deleteAt?: string;
}