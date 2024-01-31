import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quizz])],
  controllers: [QuizzController],
  providers: [QuizzService],
})
export class QuizzModule {}
