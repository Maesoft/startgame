import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { VideoGameService } from './video_games.service';
import { VideoGameDto } from './dto/create-video_game.dto';
import { UpdateVideoGameDto } from './dto/update-video_game.dto';
import { VideoGame } from './entities/video_game.entity';

@Controller('video_game')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGameService) {}

  @Post()
  create(@Body() createVideoGameDto: VideoGameDto) {
    return this.videoGamesService.create(createVideoGameDto);
  }

  @Get()
  findAll() {

    return this.videoGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoGamesService.findOne(+id);
  }
  @Get('title/:title')
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


   @Put(':id')
  update(@Param('id') id: string, @Body() videoGameDto: VideoGameDto) {
    return this.videoGamesService.update(+id, videoGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number):Promise<VideoGame> {
    return this.videoGamesService.remove(+id);
  }
}
