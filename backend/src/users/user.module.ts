import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    //   JwtModule.register({}), // Assurez-vous que le module JwtService est importé ici
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
