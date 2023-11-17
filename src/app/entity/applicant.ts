import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("userId", ["userId"], {})
@Entity("applicant", { schema: "butitin" })
export class Applicant {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "userId" })
  userId: string;

  @Column("varchar", { name: "nik", length: 255 })
  nik: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "noHp", length: 255 })
  noHp: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("longtext", { name: "alamat" })
  alamat: string;

  @Column("varchar", { name: "jenisKelamin", length: 255 })
  jenisKelamin: string;

  @Column("varchar", { name: "usia", length: 255 })
  usia: string;

  @Column("varchar", {
    name: "status",
    length: 255,
    default: () => "'pending'",
  })
  status: string;

  @Column("varchar", { name: "url_berkas", length: 255 })
  url_berkas: string;

  @Column("varchar", { name: "createAt", length: 255 })
  createAt: string;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  updateAt: string | null;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  deleteAt: string | null;

  @ManyToOne(() => User, (user) => user.applicants)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;
}
