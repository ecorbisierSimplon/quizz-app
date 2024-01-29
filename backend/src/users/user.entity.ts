import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  sur_name: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 500 })
  key: string;

  @Column({})
  date_create: Date;
}
