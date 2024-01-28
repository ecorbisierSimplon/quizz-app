import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    try {
      const loginCreated = await this.userService.login(user);
      return loginCreated;
    } catch (error) {
      console.error(error);
      throw error;
    }

    return this.userService.login(user);
  }

  @Get('me')
  async me() {
    return { hello: 'eric' };
  }
}
