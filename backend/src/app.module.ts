import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/question.module';
import { UserModule } from './users/user.module';

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
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    QuestionModule,
  ],
})
export class AppModule {}
