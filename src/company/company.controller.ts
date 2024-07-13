import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCompanyDto: CompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.companyService.findAll();
  }
  @Get('title/:title')
  @UseGuards(AuthGuard)
  findByName(@Param('title') title: string) {
    return this.companyService.findByName(title.toLowerCase());
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
