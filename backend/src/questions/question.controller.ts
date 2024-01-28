import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Controller('quiz/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getQuestions(): Promise<Question[]> {
    return this.questionService.getQuestions();
  }

  @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestion(+id);
  }

  @Post()
  async createQuestion(@Body() question: Question): Promise<Question> {
    return this.questionService.createQuestion(question);
  }
}

