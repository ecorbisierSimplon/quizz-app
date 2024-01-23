import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getQuestions(): Promise<Question[]> {
    return this.quizService.getQuestions();
  }

  @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<Question> {
    return this.quizService.getQuestion(+id);
  }

  @Post()
  async createQuestion(@Body() question: Question): Promise<Question> {
    return this.quizService.createQuestion(question);
  }

  @Post(':id/answers')
  async createAnswer(
    @Param('id') id: string,
    @Body() answer: Answer,
  ): Promise<Answer> {
    return this.quizService.createAnswer(+id, answer);
  }
}

