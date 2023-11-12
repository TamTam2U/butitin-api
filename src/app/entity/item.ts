import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface itemAttributes {
    id?: number;
    categoryId: number;
    name: string;
    deskripsi?: string;
    price: string;
    stock: number;
    gambar: string;
    createAt: string;
    updateAt?: string;
    deleteAt?: string;
}

@Table({ tableName: "item", timestamps: false })
export class item extends Model<itemAttributes, itemAttributes> implements itemAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    id?: number;
    @Column({ type: DataType.BIGINT })
    categoryId!: number;
    @Column({ type: DataType.STRING(255) })
    name!: string;
    @Column({ allowNull: true, type: DataType.STRING })
    deskripsi?: string;
    @Column({ type: DataType.STRING(255) })
    price!: string;
    @Column({ type: DataType.INTEGER })
    stock!: number;
    @Column({ type: DataType.STRING(255) })
    gambar!: string;
    @Column({ type: DataType.STRING(255) })
    createAt!: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    updateAt?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    deleteAt?: string;
}