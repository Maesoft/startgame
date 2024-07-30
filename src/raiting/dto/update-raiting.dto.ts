import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-raiting.dto';

export class UpdateRaitingDto extends PartialType(CreateRatingDto) {}
