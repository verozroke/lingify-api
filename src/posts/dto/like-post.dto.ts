import { IsNotEmpty, IsString } from "class-validator"


export class LikePostDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  postId: string
}
