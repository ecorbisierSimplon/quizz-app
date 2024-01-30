import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';
import { CreateQuizzDto } from './dto/createQuizz.dto';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Get()
  async findAll() {
    return this.quizzService.findAll();
  }

  @Get('/id/:id')
  async findOneById(@Param() params: { id: string | null }) {
    return this.quizzService.findOneById(parseInt(params.id));
  }

  @Post()
  async create(@Body() quizz: CreateQuizzDto): Promise<Quizz> {
    return this.quizzService.create(quizz);
  }
}
