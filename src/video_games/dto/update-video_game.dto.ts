import { PartialType } from '@nestjs/mapped-types';
import { VideoGameDto } from './create-video_game.dto';

export class UpdateVideoGameDto extends PartialType(VideoGameDto) {}
