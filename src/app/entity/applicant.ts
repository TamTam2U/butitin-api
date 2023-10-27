import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface applicantAttributes {
  id?: number;
  userId: number;
  nik: string;
  name: string;
  noHp: string;
  email: string;
  alamat: string;
  jenisKelamin: string;
  usia: string;
  status?: string;
  url_berkas: string;
  createAt: string;
  updateAt?: string;
  deleteAt?: string;
}

@Table({ tableName: 'applicant', timestamps: false })
export class applicant
  extends Model<applicantAttributes, applicantAttributes>
  implements applicantAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  id?: number;
  @Column({ type: DataType.BIGINT })
  userId!: number;
  @Column({ type: DataType.STRING(255) })
  nik!: string;
  @Column({ type: DataType.STRING(255) })
  name!: string;
  @Column({ type: DataType.STRING(255) })
  noHp!: string;
  @Column({ type: DataType.STRING(255) })
  email!: string;
  @Column({ type: DataType.STRING })
  alamat!: string;
  @Column({ type: DataType.STRING(255) })
  jenisKelamin!: string;
  @Column({ type: DataType.STRING(255) })
  usia!: string;
  @Column({ type: DataType.STRING(255), defaultValue: 'pending' })
  status?: string;
  @Column({ type: DataType.STRING(255) })
  url_berkas!: string;
  @Column({ type: DataType.STRING(255) })
  createAt!: string;
  @Column({ allowNull: true, type: DataType.STRING(255) })
  updateAt?: string;
  @Column({ allowNull: true, type: DataType.STRING(255) })
  deleteAt?: string;
}
