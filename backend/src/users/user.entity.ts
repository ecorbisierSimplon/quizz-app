import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Unique,
  Index,
} from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';
import { Role } from '../roles/role.entity';
import { Key } from '../keys/key.entity';
import { Question } from 'src/questions/question.entity';

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
  @Index()
  email: string;

  @Column({ type: 'varchar', length: 500 })
  key: string;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_create: Date;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_change: Date;

  @OneToMany(() => Quizz, (quizz) => quizz.user)
  quizzs: Quizz[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Quizz[];

  @OneToMany(() => Key, (key) => key.user)
  keys: Key[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
