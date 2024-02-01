import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/question.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { QuizzModule } from './quizz/quizz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `${process.env.DATABASE_URL}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    QuestionModule,
    AuthModule,
    QuizzModule,
  ],
})
export class AppModule {}
