import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { VideoGame } from 'src/video_games/entities/video_game.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category, VideoGame])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
