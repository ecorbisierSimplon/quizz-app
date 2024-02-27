import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserHash } from 'src/auth/authHash';
import { Role } from 'src/roles/role.entity';
// import { RoleService } from 'src/roles/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    const count = await this.countUser();
    if (count === 0) {
      // await this.roleService.createRoleTableAndInsertData();
    }
    if (count === 0 && user.password_first != process.env.PASS) {
      throw new BadRequestException(
        '1st login password or email are incorrect!',
      );
    }
    const existingQuizz = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingQuizz) {
      throw new BadRequestException('The email already exists!');
    }

    if (user.password != user.password_validation) {
      throw new BadRequestException("The password isn't identical!");
    }

    const roleRepo: Repository<Role> =
      this.userRepository.manager.getRepository(Role);
    const role =
      count === 0
        ? roleRepo.findOneBy({ id: 1 })
        : roleRepo.findOneBy({ id: 2 });

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

  countUser() {
    return this.userRepository.createQueryBuilder('users').getCount();
  }
}
