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
    const questions = await this.questionRepository.find({ relations: ['answers'] });
    return questions;
  }

  async getQuestion(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne( {where:{id},relations: ['answers'] });
    return question;
  }

  async createQuestion(question: Question): Promise<Question> {
    return this.questionRepository.save(question);
  }

  async createAnswer(questionId: number, answer: Answer): Promise<Answer> {
    const question = await this.questionRepository.findOne({where:{id:questionId}});
    const newAnswer = await this.answerRepository.create({ ...answer, question });
    await this.answerRepository.save(newAnswer);
    return newAnswer;
  }
}