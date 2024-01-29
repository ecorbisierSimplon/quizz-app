import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column()
  image: string;

  @Column()
  duration: number;

  @Column()
  visible: boolean;

  @Column()
  id_user: number;

  @Column()
  date_create: Date;

  @Column()
  date_change: Date;

  @ManyToOne(() => User, (user) => user.quiz)
  user: User;

  @OneToMany(() => Question, (questions) => questions.quizz)
  questions: Question[];
}

