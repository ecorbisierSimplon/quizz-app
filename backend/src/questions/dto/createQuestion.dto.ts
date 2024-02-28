import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
  IsHexColor,
  IsRgbColor,
  IsEmpty,
  IsNotEmpty,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreateQuestionDto {
  @IsString()
  text: string;

  //  @IsString()
  //  answer: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsInt()
  @IsOptional()
  score: number;

  @IsInt()
  id_quizz: number;

  @IsString()
  responses: string;
}
