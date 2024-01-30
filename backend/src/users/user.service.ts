import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserHash } from 'src/auth/authHash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    // TODO: hash the password and validate the input

    const userCreated = this.userRepository.create();
    userCreated.sur_name = user.sur_name;
    userCreated.first_name = user.first_name;
    userCreated.email = user.email;
    userCreated.role = user.role;

    const existingQuizz = await this.userRepository.findOne({
      where: { email: userCreated.email },
    });
    if (existingQuizz) {
      throw new NotFoundException('The email already exists.');
    }

    if (user.password != user.passwordValidation) {
      throw new NotFoundException("The password isn't identical !");
    }

    userCreated.key = UserHash.hashPassword(user.password);
    console.log(userCreated.key);
    return this.userRepository.save(userCreated);
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
