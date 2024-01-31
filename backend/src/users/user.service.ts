import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserHash } from 'src/auth/authHash';
import { Role } from 'src/roles/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    const existingQuizz = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingQuizz) {
      throw new NotFoundException('The email already exists.');
    }

    if (user.password != user.password_validation) {
      throw new NotFoundException("The password isn't identical !");
    }

    const roleRepo: Repository<Role> =
      this.userRepository.manager.getRepository(Role);
    const role = roleRepo.findOneBy({ id: 1 });

    const userCreated = new User(); //this.userRepository.create();
    userCreated.sur_name = user.sur_name;
    userCreated.first_name = user.first_name;
    userCreated.email = user.email;
    userCreated.role = await role;

    userCreated.key = UserHash.hashPassword(user.password);

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
