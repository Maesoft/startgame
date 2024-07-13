import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { AuthGuard } from '@nestjs/passport'; // Importa el AuthGuard adecuado para JWT

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Protege este endpoint con JWT
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')) // Protege este endpoint con JWT
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('title/:title')
  @UseGuards(AuthGuard('jwt')) // Protege este endpoint con JWT
  findByName(@Param('title') title: string) {
    return this.categoryService.findByName(title.toLowerCase());
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')) // Protege este endpoint con JWT
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt')) // Protege este endpoint con JWT
  update(@Param('id') id: number, @Body() categoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, categoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) // Protege este endpoint con JWT
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(+id);
  }
}