import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizz } from './quizz.entity';
import { CreateQuizzDto } from './dto/createQuizz.dto';

@Injectable()
export class QuizzService {
  constructor(
    @InjectRepository(Quizz)
    private quizzRepository: Repository<Quizz>,
  ) {}

  async create(quizz: CreateQuizzDto) {
    // Vérifier si la valeur existe déjà
    const existingQuizz = await this.quizzRepository.findOne({
      where: { text: quizz.text },
    });
    if (existingQuizz) {
      throw new NotFoundException('The value already exists.');
    }
    return this.quizzRepository.save(quizz);
  }

  findAll() {
    return this.quizzRepository.find();
  }

  findOneById(id: number) {
    return this.quizzRepository.findOne({
      where: { id: id },
    });
  }
}
