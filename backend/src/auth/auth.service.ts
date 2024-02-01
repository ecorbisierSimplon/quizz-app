import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserHash } from './authHash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const tableUsers = await this.userRepository.find();
    const user = await tableUsers.find(
      (tableUsers) => tableUsers.email === email,
    );
    try {
      if (UserHash.verifyPassword(password, user.key)) {
        const payload = { sub: user.id, username: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new NotFoundException(
          'This login and/or password is incorrect !',
        );
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
