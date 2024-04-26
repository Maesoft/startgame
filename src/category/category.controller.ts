import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log('Nuevo usuario creado:', createCategoryDto);
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Get('title/:title')
  findByName(@Param('title') title: string) {
    return this.categoryService.findByName(title.toLowerCase());
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() categoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, categoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<Category>{
    return this.categoryService.remove(+id);
  }
}
