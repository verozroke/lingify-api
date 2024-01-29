import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  ownerId: string

  @IsNotEmpty()
  @IsString()
  communityId: string
}
