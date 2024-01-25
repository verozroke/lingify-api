import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthSingupDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at beetween 3 and 20 characters' })
  public password: string;
}


export class AuthSinginDto {

  @IsNotEmpty()
  @IsString()
  public nickname: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at beetween 3 and 20 characters' })
  public password: string;
}




