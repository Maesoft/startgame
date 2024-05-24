import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConsoleService } from './console.service';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('console')
export class ConsoleController {
  constructor(private readonly consoleService: ConsoleService) {}

  @Post()
  @UseGuards(AuthGuard)
  newConsole(@Body() createConsoleDto: CreateConsoleDto) {
    return this.consoleService.newConsole(createConsoleDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.consoleService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateConsoleDto: UpdateConsoleDto) {
    return this.consoleService.update(+id, updateConsoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.consoleService.remove(+id);
  }
}
