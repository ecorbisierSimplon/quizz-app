import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column({ length: 1500 })
  responses: string;

  @Column({ length: 500 })
  image: string;

  @Column()
  duration: number;

  @Column()
  score: number;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_create: Date;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_change: Date;

  @ManyToOne(() => Quizz, (quizz) => quizz.questions)
  quizz: Quizz;

  @ManyToOne(() => User, (user) => user.questions)
  user: User;
}
