import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';
import { Role } from '../roles/role.entity';
import { Key } from '../keys/key.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  sur_name: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 500 })
  key: string;

  @Column({ default: 0 })
  role: number;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_create: Date;

  @OneToMany(() => Quizz, (quizz) => quizz.user)
  quizz: Quizz[];


  @OneToMany(() => Key, (keys) => keys.user)
  keys: Key[];

  @ManyToOne(() => Role, (role) => role.users)
  roles: Role[];
}