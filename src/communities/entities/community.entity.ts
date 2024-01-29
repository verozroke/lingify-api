import { IsNotEmpty, IsString, IsDate } from "class-validator"

export class Community {
  @IsNotEmpty()
  @IsString()
  id: string

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

  @IsNotEmpty()
  @IsDate()
  createdAt: Date

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date
}
