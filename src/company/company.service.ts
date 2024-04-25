import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { error } from 'console';
import { Company } from './entities/company.entity';
import { CompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { VideoGame } from 'src/video_games/entities/video_game.entity';


@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company)
  private companyRepository: Repository<Company>,
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>) { }


  //Traer todas las companias y sus juegos
  async findAll(): Promise<Company[]> {
    const criterio: FindManyOptions = { relations: ['videoGame'] };
    const company: Company[] = await this.companyRepository.find(criterio)


    return company
  }

  //Traer companias por id y su juego asociado
  async findOne(id: number): Promise<Company> {
    const criterio: FindOneOptions = { relations: ['videoGame'], where: { id: id } }
    const company = await this.companyRepository.findOne(criterio)
    if (!company) {
      throw new NotFoundException(`Compania con ID ${id} no encontrada`)
    }
    return company;
  }

  //Crear compania
  async create(companyDto: CompanyDto): Promise<Company> {
    try {
      // Crear una nueva instancia de Compania con los datos del DTO
      const company = await this.companyRepository.save(new Company(companyDto.name, companyDto.siteUrl))

      // Guardar la nueva compania en la base de datos
      const companySave = await this.companyRepository.save(company);

      return companySave;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la creacion de la compania' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }


  //Editar la compania
  async update(id: number, companyDto: UpdateCompanyDto): Promise<Company> {
    try {
      // Primero, verifica si la compania existe.
      const company = await this.findOne(id);
      if (!company) {
        throw new NotFoundException(`Compania con ID ${id} no encontrada`);
      }
      //Verificar si el video juego existe

       // Verifica si videoGame existe.
       const videoGame = await this.videoGameRepository.findOne({ where: { id: companyDto.videoGameId/*tambien se puede poner clase.profesor.id*/ } });
       if (!videoGame) {
         throw new NotFoundException(`Video Juego con ID ${companyDto.videoGameId} no encontrada`);
       }
 
      // Si los campos existen, actualiza los campos necesarios.
      if (companyDto.name) company.name = companyDto.name;
      if (companyDto.siteUrl) company.siteUrl = companyDto.siteUrl;
      if (companyDto.videoGameId) videoGame.id = companyDto.videoGameId;;


      // Actualiza la asociación con videoGame
      company.videoGame = [videoGame];

      // Guarda los cambios en la base de datos.
      await this.companyRepository.save(company);

      return company;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error en la actualización de la compania: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Eliminar una categoria

  async remove(id: number): Promise<Company> {
    try {
      // Buscar la compania por su ID
      const company = await this.findOne(id);

      if (!company) {
        throw new NotFoundException(`Compania con ID ${id} no encontrada.`);
      }

      // Eliminar la asociación con videoGame
      //Asignar un valor por defecto
      company.videoGame = null;

      // Guardar los cambios en la base de datos
      await this.companyRepository.save(company);

      // Eliminar al profesor
      await this.companyRepository.remove(company);

      return company;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la eliminacion de la compania: ' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
}

