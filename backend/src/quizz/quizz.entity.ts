import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

@Entity()
@Unique(['text'])
export class Quizz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 5 * 60, nullable: true })
  duration: number;

  @Column({ default: true, nullable: true })
  visible: boolean;

  @Column({ length: 500 })
  color: string;

  @Column()
  id_user: number;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_create: Date;

  @Column({ type: 'timestamptz', default: 'Now()' })
  date_change: Date;

  @ManyToOne(() => User, (user) => user.quizz)
  user: User;

  @OneToMany(() => Question, (questions) => questions.quizz)
  questions: Question[];
}
