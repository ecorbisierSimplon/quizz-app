import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['answers'] });
  }

  async getQuestion(id: number): Promise<Question> {
    return this.questionRepository.findOne(id, { relations: ['answers'] });
  }

  async createQuestion(question: Question): Promise<Question> {
    return this.questionRepository.save(question);
  }

  async createAnswer(questionId: number, answer: Answer): Promise<Answer> {
    const question = await this.questionRepository.findOne(questionId);
    answer.question = question;
    return this.answerRepository.save(answer);
  }
}