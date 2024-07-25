import { ConflictException, Injectable, NotFoundException,  HttpException, HttpStatus} from '@nestjs/common';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { Console } from './entities/console.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { VideoGame } from 'src/video_games/entities/video_game.entity';


@Injectable()
export class ConsoleService {
  constructor(@InjectRepository(Console) private readonly consoleRepository: Repository<Console>,
  @InjectRepository(VideoGame)
  private readonly videoGameRepository: Repository<VideoGame>) { }

  //Crear consola
  async create(consoleDto: CreateConsoleDto): Promise<Console> {
    try {
      // Crear una nueva instancia de Consola con los datos del DTO
      const console = await this.consoleRepository.save(new Console(consoleDto.name, consoleDto.year))

      return console;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la creacion de la consola' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }

  //Traer consola por name
  async findByName(name: string): Promise<Console> {
    try {
      const criterio: FindOneOptions = { relations: ['videoGame'], where: { name: name } }
      const console = await this.consoleRepository.findOne(criterio)
      if (!console) {
        throw new NotFoundException(`Consola con el nombre ${name} no encontrada`)
      }
      return console;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de la consola' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
  //Traer todas las consolas y sus juegos
  async findAll(): Promise<Console[]> {
    try {
      const criterio: FindManyOptions = { relations: ['videoGame'] };
      const console: Console[] = await this.consoleRepository.find(criterio)


      return console
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de la consola' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }

  //Traer consolas por id y su juego asociado
  async findOne(id: number): Promise<Console> {
    try {
      const criterio: FindOneOptions = { relations: ['videoGame'], where: { id: id } }
      const console = await this.consoleRepository.findOne(criterio)
      if (!console) {
        throw new NotFoundException(`Consola con ID ${id} no encontrada`)
      }
      return console;
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de la consola' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }

   //Editar la compania
   async update(id: number, consoleDto: UpdateConsoleDto): Promise<Console> {
    try {
      // Primero, verifica si la consola existe.
      const console = await this.findOne(id);
      if (!console) {
        throw new NotFoundException(`Consola con ID ${id} no encontrada`);
      }
     // Verifica si existen videojuegos relacionados.
     let videoGames: VideoGame[] = [];
     if (consoleDto.videoGameId&& consoleDto.videoGameId.length > 0) {
       videoGames = await Promise.all(
         consoleDto.videoGameId.map(async (videGameId) => {
           const game = await this.videoGameRepository.findOne({ where: { id: videGameId } });
           if (!console) {
             throw new NotFoundException(`Console con ID ${videoGames} no encontrada`);
           }
           return game;
         })
       );
     }


      // Si los campos existen, actualiza los campos necesarios.
      if (consoleDto.name) console.name = consoleDto.name;
      if(consoleDto.year) console.year=consoleDto.year
      // Actualiza la asociación con videoGame
      console.videoGame = videoGames

      // Guarda los cambios en la base de datos.
      await this.consoleRepository.save(console);

      return console;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error en la actualización de la consola: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 async remove(id: number): Promise<Console> {
    try {
      // Buscar la consola por su ID
      const console = await this.findOne(id);

      if (!console) {
        throw new NotFoundException(`Consola con ID ${id} no encontrada.`);
      }

      // Eliminar la asociación con videoGame
      console.videoGame =null;

      // Guardar los cambios en la base de datos
      await this.consoleRepository.save(console);

      // Eliminar la consola
      await this.consoleRepository.remove(console);

      return console;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la eliminacion de la consola: ' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
}







 

 


