import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CardSet {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
