import { IsNotEmpty, IsString } from "class-validator"

export class SubCommunityDto {
  @IsNotEmpty()
  @IsString()
  communityId: string

  @IsNotEmpty()
  @IsString()
  userId: string
}