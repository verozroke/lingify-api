
import { IsNotEmpty, IsString } from "class-validator"


export class CommentPostDto {
  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  postId: string
}
