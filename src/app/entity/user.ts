import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Applicant } from "./applicant";

@Index("email", ["email"], { unique: true })
@Entity("user", { schema: "butitin" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "name", length: 255, default: () => "'user'" })
  name: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "status", length: 50, default: () => "'user'" })
  status: string;

  @Column("varchar", { name: "otp", length: 255 })
  otp: string;

  @Column("varchar", { name: "createAt", length: 255 })
  createAt: string | Date;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  updateAt: string | null | Date;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  @DeleteDateColumn()
  deleteAt: string | null | Date;

  @OneToMany(() => Applicant, (applicant) => applicant.userId)
  applicants: Applicant[];
}
