import { IsNotEmpty, IsString } from "class-validator"

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  ownerId: string

  @IsNotEmpty()
  @IsString()
  postId: string

}
