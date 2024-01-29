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

  @Get('me')
  async me() {
    return { hello: 'Hello Word' };
  }

  @Get('id/:id')
  async findOne(@Param() params: { id: string | null }) {
    return this.userService.findOneById(parseInt(params.id));
  }

  @Get('email/:email')
  async findOneEmail(@Param() params: { email: string }) {
    const user = await this.userService.findOneByEmail(params.email);
    try {
      const send = user.id;
      return { user };
    } catch (error) {
      return { email: null };
    }
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
  }
}
