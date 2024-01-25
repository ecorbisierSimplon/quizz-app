import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surName: string;

  @Column()
  firstName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

