import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  sur_name: string;

  @Column()
  rang: number;

  @Column()
  date_create: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

