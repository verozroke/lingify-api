import { IsNotEmpty, IsString } from "class-validator"

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  language: string

  @IsString()
  description?: string

  @IsNotEmpty()
  @IsString()
  ownerId: string

  @IsNotEmpty()
  @IsString()
  avatarId: string

  @IsNotEmpty()
  @IsString()
  bannerId: string

  @IsNotEmpty()
  @IsString()
  countryId: string

}
