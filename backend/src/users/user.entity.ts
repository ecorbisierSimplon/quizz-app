import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Quiz } from '../quiz/quiz.entity';
import { Role } from '../roles/role.entity';
import { Key } from '../keys/key.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  sur_name: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 500 })
  key: string;

  @Column({})
  date_create: Date;

  @OneToMany(() => Quiz, (quizz) => quizz.user)
  quiz: Quiz[];

  @OneToMany(() => Key, (keys) => keys.user)
  keys: Key[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
