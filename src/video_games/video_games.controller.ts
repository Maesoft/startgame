import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { VideoGameService } from './video_games.service';
import { VideoGameDto } from './dto/create-video_game.dto';
import { UpdateVideoGameDto } from './dto/update-video_game.dto';
import { VideoGame } from './entities/video_game.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('video_game')
export class VideoGamesController {
  constructor(private readonly videoGamesService: VideoGameService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createVideoGameDto: VideoGameDto) {
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
