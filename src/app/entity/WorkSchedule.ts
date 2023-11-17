import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("work_schedule", { schema: "butitin" })
export class WorkSchedule {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "day", length: 255 })
  day: string;

  @Column("varchar", { name: "startWork", length: 255 })
  startWork: string;

  @Column("varchar", { name: "endWork", length: 255 })
  endWork: string;

  @Column("varchar", { name: "createAt", length: 255 })
  createAt: string;

  @Column("varchar", { name: "updateAt", nullable: true, length: 255 })
  updateAt: string | null;

  @Column("varchar", { name: "deleteAt", nullable: true, length: 255 })
  deleteAt: string | null;
}
