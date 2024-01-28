import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  text: string;

  @Column({ length: 500 })
  responses: string;
}
