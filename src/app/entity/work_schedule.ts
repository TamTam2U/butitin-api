import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";

export interface work_scheduleAttributes {
    id?: number;
    day: string;
    startWork: string;
    endWork: string;
    createAt: string;
    updateAt?: string;
    deleteAt?: string;
}

@Table({ tableName: "work_schedule", timestamps: false })
export class work_schedule extends Model<work_scheduleAttributes, work_scheduleAttributes> implements work_scheduleAttributes {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
    id?: number;
    @Column({ type: DataType.STRING(255) })
    day!: string;
    @Column({ type: DataType.STRING(255) })
    startWork!: string;
    @Column({ type: DataType.STRING(255) })
    endWork!: string;
    @Column({ type: DataType.STRING(255) })
    createAt!: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    updateAt?: string;
    @Column({ allowNull: true, type: DataType.STRING(255) })
    deleteAt?: string;
}