import { IsNotEmpty, IsString } from 'class-validator';

export class ReservationDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
