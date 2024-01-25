import { Controller, Post, Body, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';

@Controller('quiz/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':id')
  async createAnswer(
    @Param('id') id: string,
    @Body() answer: Answer,
  ): Promise<Answer> {
    return this.answerService.createAnswer(+id, answer);
  }
}