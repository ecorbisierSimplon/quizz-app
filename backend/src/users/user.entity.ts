import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  surName: string;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 500 })
  key: string;
}
