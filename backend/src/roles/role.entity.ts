import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  text: string;

  @Column({ default: 0 })
  rang: number;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_create: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
