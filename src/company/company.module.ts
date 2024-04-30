import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { VideoGame } from 'src/video_games/entities/video_game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, VideoGame])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
