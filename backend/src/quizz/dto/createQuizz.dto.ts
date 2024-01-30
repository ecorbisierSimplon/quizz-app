import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreateQuizzDto {
  @IsString()
  @Unique(['text'])
  text: string;

  @IsString()
  image: string;

  @IsString()
  color: string;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsBoolean()
  visible: boolean;

  @IsDate()
  @IsOptional()
  date_create: Date;
}
