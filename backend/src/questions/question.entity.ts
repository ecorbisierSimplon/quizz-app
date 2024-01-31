import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Quizz } from '../quizz/quizz.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column({ length: 500 })
  responses: string;

  @ManyToOne(() => Quizz, (quizz) => quizz.questions)
  quizz: Quizz;
}
