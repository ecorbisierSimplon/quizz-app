import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/question.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { QuizzModule } from './quizz/quizz.module';
import { RoleModule } from 'src/roles/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `${process.env.DATABASE_URL}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    QuestionModule,
    AuthModule,
    QuizzModule,
    RoleModule,
  ],
})
export class AppModule {}
