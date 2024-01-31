import {
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
  IsHexColor,
} from 'class-validator';
import { Unique } from 'typeorm';

export class CreateQuizzDto {
  @IsString()
  @Unique(['text'])
  text: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  session: string;

  @IsHexColor()
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
