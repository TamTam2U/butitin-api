import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item';

@Entity('category', { schema: 'butitin' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'createAt', length: 255 })
  createAt: string | Date;

  @Column('varchar', { name: 'updateAt', nullable: true, length: 255 })
  updateAt: string | Date | null;

  @Column('varchar', { name: 'deleteAt', nullable: true, length: 255 })
  @DeleteDateColumn()
  deleteAt: string | Date | null;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
