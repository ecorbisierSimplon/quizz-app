import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}

