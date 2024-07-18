import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ConsoleService } from './console.service';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('console')
export class ConsoleController {
  constructor(private readonly consoleService: ConsoleService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createConsoleDto: CreateConsoleDto) {
    return this.consoleService.create(createConsoleDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.consoleService.findAll();
  }
  @Get(':id')
  @UseGuards(AuthGuard) // Proteger la ruta con el guardia de autenticación
  getById(@Param('id') id: number) {
    return this.consoleService.findOne(id);
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id:number, @Body() updateConsoleDto: UpdateConsoleDto) {
    return this.consoleService.update(+id, updateConsoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.consoleService.remove(+id);
  }
}
