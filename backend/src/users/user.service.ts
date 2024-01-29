import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async login(user: User): Promise<any> {
    // TODO: verify the password and generate a JWT
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
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
