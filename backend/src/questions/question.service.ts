import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/createQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async getQuestions(): Promise<Question[]> {
    const questions = await this.questionRepository.find({
      relations: ['answers'],
    });
    return questions;
  }

  async getQuestion(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['answers'],
    });
    return question;
  }

  async createQuestion(question: CreateQuestionDto): Promise<Question> {
    return this.questionRepository.save(question);
  }
}
