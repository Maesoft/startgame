import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';  // Importa el guard JWT
import { DataService } from './data.service';
import { CreateDataDTO } from './dto/create-data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDataDto: CreateDataDTO) {
    return this.dataService.create(createDataDto);
  }
}
