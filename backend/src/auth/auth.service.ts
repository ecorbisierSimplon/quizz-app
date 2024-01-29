// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(userId: number, username: string): Promise<string> {
    const payload = { sub: userId, username };
    return this.jwtService.sign(payload);
  }

  async login(user: User): Promise<any> {
    // TODO: verify the password and generate a JWT
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
