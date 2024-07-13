import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { Console } from './entities/console.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class ConsoleService {
  constructor(@InjectRepository(Console) private readonly repositoryConsole: Repository<Console>) { }

  public async newConsole(createConsoleDto: CreateConsoleDto) {
    const consoleFound = await this.findOneByName(createConsoleDto.name)
    if (consoleFound) throw new ConflictException('The console already exists.')
    const newConsole: Console = this.repositoryConsole.create(createConsoleDto)
    return await this.repositoryConsole.save(newConsole);
  }

  private async findOneByName(name: string) {
    return this.repositoryConsole.findOneBy({ name });
  }

  public async findAll() {
    return await this.repositoryConsole.find()
  }

  public async update(id: number, updateConsoleDto: UpdateConsoleDto) {
    const consoleFound = await this.repositoryConsole.findOneBy({ id })
    if(!consoleFound) throw new NotFoundException('The console does not exist.')
    Object.assign(consoleFound.name, updateConsoleDto);
    return await this.repositoryConsole.save(consoleFound)
  }

  public async remove(id: number) {
    const consoleFound = await this.repositoryConsole.findOneBy({id})
    if(!consoleFound) throw new NotFoundException('The console does not exist.')
    return await this.repositoryConsole.delete(consoleFound)
  }
}
