import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';

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

    return this.userService.login(user);
  }
}

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(AuthGuard('local')) // Utilisez le local strategy pour l'authentification de base (username/password)
  async login(@Request() req: any) {
    // À ce stade, l'utilisateur est authentifié avec succès, et req.user contient les informations de l'utilisateur.
    const { id, sur_name } = req.user;
    const token = await this.authService.generateToken(id, sur_name);

    // Retournez le token et éventuellement d'autres informations si nécessaire.
    return { token, id, sur_name };
  }
}
