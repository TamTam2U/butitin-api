import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";
import { Entity } from "typeorm";

export interface userAttributes {
    id?: number;
    email: string;
    password: string;
    status?: number;
    otp:string;
    createAt: string;
    updateAt?: string;
    deleteAt?: string;
}

@Table({ tableName: "user", timestamps: false })
export class user extends Model<userAttributes, userAttributes> implements userAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    id?: number;
    @Column({ type: DataType.STRING(255)})
    email!: string;
    @Column({ type: DataType.STRING(255) })
    password!: string;
    @Column({ type: DataType.INTEGER, defaultValue: 1 })
    status?: number;
    @Column({type:DataType.INTEGER,unique:true})
    otp: string;
    @Column({ type: DataType.STRING(255) })
    createAt!: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    updateAt?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    deleteAt?: string;
}