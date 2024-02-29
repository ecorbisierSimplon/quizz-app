import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/question.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { QuizzModule } from './quizz/quizz.module';
import { RoleModule } from './roles/role.module';
import { FileModule } from './files/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    UserModule,
    QuestionModule,
    AuthModule,
    QuizzModule,
    RoleModule,
    FileModule,
  ],
})
export class AppModule {}
