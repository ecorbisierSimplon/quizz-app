import { IsString, IsEmail, IsInt, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  sur_name: string;

  @IsString()
  first_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  password_validation: string;

  @IsString()
  @IsOptional()
  password_first: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  role: number;
}
