import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quizz } from './quizz.entity';
import { CreateQuizzDto } from './dto/createQuizz.dto';
import { User } from '../users/user.entity';
import { AppModule } from '../app.module';

@Injectable()
export class QuizzService {
  constructor(
    @InjectRepository(Quizz)
    private quizzRepository: Repository<Quizz>,
  ) {}

  async create(req, quizz: CreateQuizzDto) {
    // Vérifier si la valeur existe déjà
    const userAuth = req.user;
    console.log(userAuth);

    try {
      const idUser = userAuth.sub;
      const existingQuizz = await this.quizzRepository.findOne({
        where: { text: quizz.text },
      });
      if (existingQuizz) {
        throw new NotFoundException('The value already exists.');
      }

      const userRepo: Repository<User> =
        this.quizzRepository.manager.getRepository(User);
      const user = userRepo.findOneBy({ id: idUser });

      const quizzCreated = new Quizz();
      quizzCreated.text = quizz.text;
      quizzCreated.image = quizz.image;
      quizzCreated.duration = quizz.duration;
      quizzCreated.color = quizz.color;
      quizzCreated.user = await user;

      console.log(quizzCreated);

      return this.quizzRepository.save(quizz);
    } catch (error) {
      throw new NotFoundException("You haven't authorization !!! " + error);
    }
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
