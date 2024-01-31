import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Key {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  key: string;

  @Column()
  type: number;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_create: Date;

  @ManyToOne(() => User, (user) => user.keys)
  user: User;
}
