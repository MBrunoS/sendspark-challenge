import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
    message: 'password must have at least one uppercase letter and one number',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  companyName: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  jobTitle: string;
}
