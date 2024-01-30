import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    // TODO: hash the password and validate the input
    return this.userRepository.save(user);

    const userCreated = this.userRepository.create();
    userCreated.sur_name = user.sur_name;
    userCreated.first_name = user.first_name;
    userCreated.email = user.email;
    userCreated.key = user.key;
    userCreated.role = user.role;
    await this.userRepository.insert(userCreated);
    // userCreated.questions = await this.quesuserService.createMany(
    //   quiz.questions,
    // );

    await this.userRepository.save(userCreated);
    return userCreated;
  }
  async testLogin(email: string): Promise<User | undefined> {
    const tableUsers = await this.userRepository.find();
    return tableUsers.find((tableUsers) => tableUsers.email === email);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }
}
