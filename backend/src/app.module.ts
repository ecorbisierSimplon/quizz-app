import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from './quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'db',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'quiz',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    QuizModule,
  ],
})
export class AppModule {}
