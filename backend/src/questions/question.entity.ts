import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';


@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column({ length: 500 })
  responses: string;

  @ManyToOne(() => Quiz, (quizz) => quizz.questions)
  quizz: Quiz;
}
