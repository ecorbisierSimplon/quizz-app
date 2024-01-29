import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('login')
export class LoginController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('local')) // Utilisez le local strategy pour l'authentification de base (username/password)
  async login(@Body() user: User) {
    // À ce stade, l'utilisateur est authentifié avec succès, et req.user contient les informations de l'utilisateur.
    const thisUser = await this.userService.findOneByEmail(user.email);
    const { id, sur_name } = thisUser;
    const token = await this.authService.generateToken(id, sur_name);

    // Retournez le token et éventuellement d'autres informations si nécessaire.
    return { token, id, sur_name };
  }
}
