import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { VideoGameService } from './video_games.service';
import { VideoGameDto } from './dto/create-video_game.dto';
import { UpdateVideoGameDto } from './dto/update-video_game.dto';
import { VideoGame } from './entities/video_game.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('video_games')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGameService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createVideoGameDto: VideoGameDto) {
    return this.videoGamesService.create(createVideoGameDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.videoGamesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.videoGamesService.findOne(+id);
  }
  @Get('title/:title')
  @UseGuards(AuthGuard)
  findByName(@Param('title') title: string) {
    return this.videoGamesService.findByName(title.toLowerCase());
  }
  @Get('/category/:name')
  async findByCategory(@Param('name') name: string): Promise<VideoGame[]> {
    try {
      const videoGames = await this.videoGamesService.findByCategory(name);
      return videoGames;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`No se encontraron videojuegos para la categoría: ${name}`);
      } else {
        throw error; // Pasa cualquier otro error al middleware de manejo de errores global
      }
    }
  }

  @Get(':id/average-rating')
  async getAverageRating(@Param('id', ParseIntPipe) id: number) {
    const videoGame = await this.videoGamesService.findOne(id);
    const averageRating = await this.videoGamesService.getAverageRating(id); // Ajusta esto según cómo esté implementado en el servicio.
    return { averageRating };
  }
   @Put(':id')
   @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() videoGameDto: VideoGameDto) {
    return this.videoGamesService.update(+id, videoGameDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number):Promise<VideoGame> {
    return this.videoGamesService.remove(+id);
  }
}
