import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(questionId: number, answer: Answer): Promise<Answer> {
    const question = await this.questionRepository.findOne({where:{id:questionId}});
    const newAnswer = await this.answerRepository.create({ ...answer, question });
    await this.answerRepository.save(newAnswer);
    return newAnswer;
  }
}
