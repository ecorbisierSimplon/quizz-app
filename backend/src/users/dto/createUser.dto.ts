import { IsString, IsEmail, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  sur_name: string;

  @IsString()
  first_name: string;

  @IsEmail()
  email: string;

  @IsString()
  key: string;

  @IsInt()
  @Min(1)
  @Max(5)
  role: number;
}