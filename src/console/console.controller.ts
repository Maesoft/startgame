import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsoleService } from './console.service';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';

@Controller('console')
export class ConsoleController {
  constructor(private readonly consoleService: ConsoleService) {}

  @Post()
  newConsole(@Body() createConsoleDto: CreateConsoleDto) {
    return this.consoleService.newConsole(createConsoleDto);
  }

  @Get()
  findAll() {
    return this.consoleService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateConsoleDto: UpdateConsoleDto) {
    return this.consoleService.update(+id, updateConsoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consoleService.remove(+id);
  }
}
