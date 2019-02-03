import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
