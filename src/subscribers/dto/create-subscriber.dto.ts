import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubscriberDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  communityId: string;
}
