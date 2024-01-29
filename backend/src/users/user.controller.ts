import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }) {
    return this.userService.findOneById(parseInt(params.id));
  }
  @Get(':email')
  async findOneEmail(@Param() params: { email: string }) {
    return this.userService.findOneByEmail(params.email);
  }

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
