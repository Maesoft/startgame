import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;  // Calificación de 0 a 5

  @IsNumber()
  @IsNotEmpty()
  videoGameId?: number;

  @IsNumber()
  @IsNotEmpty()
  userId?: number;
}