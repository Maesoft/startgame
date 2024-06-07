import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;
}
