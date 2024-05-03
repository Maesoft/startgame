import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { Console } from './entities/console.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ConsoleService {
  constructor(@InjectRepository(Console) private readonly repositoryConsole: Repository<Console>) { }

  public async newConsole(createConsoleDto: CreateConsoleDto) {
    const consoleFound = this.findOneByName(createConsoleDto.name)
    if (consoleFound) throw new ConflictException('The console already exists.')
    const newConsole: Console = this.repositoryConsole.create(createConsoleDto)
    return await this.repositoryConsole.save(newConsole);
  }

  private async findOneByName(name: string) {
    return await this.repositoryConsole.findOneBy({ name });
  }
  
  findAll() {
    return `This action returns all console`;
  }


  update(id: number, updateConsoleDto: UpdateConsoleDto) {
    return `This action updates a #${id} console`;
  }

  remove(id: number) {
    return `This action removes a #${id} console`;
  }
}
