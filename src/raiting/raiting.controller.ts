import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { RatingService } from './raiting.service';
import { CreateRatingDto } from './dto/create-raiting.dto';
import { Rating } from './entities/raiting.entity';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingService.create(createRatingDto);
  }

  // Endpoint para obtener calificaciones de un videojuego específico
  @Get('video-game/:videoGameId')
  async getRatingsByVideoGame(@Param('videoGameId') videoGameId: number): Promise<Rating[]> {
      return this.ratingService.findByVideoGame(videoGameId);
  }

  // Endpoint para obtener la calificación promedio de un videojuego específico
  @Get('video-game/:videoGameId/average')
  async getAverageRating(@Param('videoGameId') videoGameId: number): Promise<number> {
    return this.ratingService.getAverageRating(videoGameId);
  }

    // Nuevo endpoint para contar cuántas veces se dio una calificación específica
    @Get('video-game/:videoGameId/count-rating')
    async countRating(
      @Param('videoGameId') videoGameId: number,
      @Query('value') ratingValue: number
    ): Promise<number> {
      return this.ratingService.countSpecificRating(videoGameId, ratingValue);
    }
}