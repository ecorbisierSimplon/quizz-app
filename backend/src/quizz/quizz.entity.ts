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

  @Column({ default: '$lib/image/questionnaire-a.png', nullable: true })
  image: string;

  @Column({ default: 5 * 60, nullable: true })
  duration: number;

  @Column({ default: true, nullable: true })
  visible: boolean;

  @Column({ default: '#7f8bcc', nullable: true })
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
