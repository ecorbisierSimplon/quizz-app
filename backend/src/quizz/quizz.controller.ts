import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';
import { CreateQuizzDto } from './dto/createQuizz.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Req() req, @Body() quizz: CreateQuizzDto): Promise<Quizz> {
    return this.quizzService.create(req, quizz);

  }
}
