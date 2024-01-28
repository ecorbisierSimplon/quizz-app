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
    userCreated.surName = user.surName;
    userCreated.firstName = user.firstName;
    userCreated.email = user.email;
    userCreated.key = user.key;
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
}
