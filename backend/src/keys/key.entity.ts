import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  id_user: number;

  @Column()
  type: number;

  @Column()
  date_create: Date;

  @ManyToOne(() => User, (user) => user.keys)
  user: User;
}