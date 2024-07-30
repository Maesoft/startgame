import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { VideoGame } from './entities/video_game.entity';
import { VideoGameDto } from './dto/create-video_game.dto';
import { UpdateVideoGameDto } from './dto/update-video_game.dto';
import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';
import { Console } from 'src/console/entities/console.entity';
import Rating from 'src/raiting/entities/raiting.entity';
@Injectable()
export class VideoGameService {
  constructor(@InjectRepository(VideoGame)
  private videoGameRepository: Repository<VideoGame>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) { }


  //Traer todos sus juegos y sus relaciones
  async findAll(): Promise<VideoGame[]> {
    try {
      const criterio: FindManyOptions = { relations: ['categoria', 'company', 'console','ratings'] };
      const videoGame: VideoGame[] = await this.videoGameRepository.find(criterio)
      return videoGame
    } catch
    (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda del video juego' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }

  //Traer video juegos por id y su juego asociado
  async findOne(id: number): Promise<VideoGame> {
    const criterio: FindOneOptions = { relations: ['categoria', 'company', 'console', 'ratings'], where: { id: id } }
    const videoGame = await this.videoGameRepository.findOne(criterio)
    if (!videoGame) {
      throw new NotFoundException(`Video Juego con ID ${id} no encontrado`)
    }
    return videoGame;
  }

  //Traer video juegos por name
  async findByName(name: string): Promise<VideoGame> {
    const criterio: FindOneOptions = { relations: ['categoria', 'company', 'console', 'ratings'], where: { name: name } }
    const videoGame = await this.videoGameRepository.findOne(criterio)
    if (!videoGame) {
      throw new NotFoundException(`Video Juego con nombre: ${name} no encontrado`)
    }
    return videoGame;
  }

  //Traer video juegos por name

  //Traer video juegos por name
  async findByCategory(name: string): Promise<VideoGame[]> {
    const criterio: FindManyOptions = {
        relations: ['categoria'],
        where: {
            categoria: {
                name: name
            }
        }
    };
    const videoGames = await this.videoGameRepository.find(criterio);
    if (!videoGames || videoGames.length === 0) {
        throw new NotFoundException(`No se encontraron videojuegos para la categoría: ${name}`);
    }
    return videoGames;
}
//calificaciones
async getAverageRating(id: number): Promise<number> {
  const videoGame = await this.findOne(id);

  if (!videoGame.ratings || videoGame.ratings.length === 0) {
    throw new NotFoundException(`No se encontraron calificaciones para el videojuego con ID ${id}`);
  }

  const total = videoGame.ratings.reduce((sum, rating) => sum + rating.value, 0);
  return total / videoGame.ratings.length;
}
  //Crear ficha video juego
  async create(videoGameDto: VideoGameDto): Promise<VideoGame> {

    const videoGame =  this.videoGameRepository.create(videoGameDto)

    // Guardar nuevo juego en la base de datos
    const videoGameSave =  this.videoGameRepository.save(videoGame);

    return videoGameSave;
  }



  //Editar ficha video juego
  async update(id: number, videoGameDto: UpdateVideoGameDto): Promise<VideoGame> {
    try {
      // Primero, verifica si el video juego existe.
      const videoGame = await this.findOne(id);
      if (!videoGame) {
        throw new NotFoundException(`Video juego con ID ${id} no encontrada`);
      }
  
      //Verificamos si la categoria existe
      let categories: Category[] = [];
      if (videoGameDto.categoryId && videoGameDto.categoryId.length > 0) {
        categories = await Promise.all(
          videoGameDto.categoryId.map(async (categoryId) => {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
              throw new NotFoundException(`Categoría con ID ${categoryId} no encontrada`);
            }
            return category;
          })
        );
      }
  
      //Verificamos si la compañia existe
      const company = await this.companyRepository.findOne({ where: { id: videoGameDto.companyId } });
      const console = await this.consoleRepository.findOne({ where: { id: videoGameDto.consoleId } });
     //Verificamos si consola existe
      //  let consoles: Console[] = [];
      // if (videoGameDto.consoleId && videoGameDto.consoleId.length > 0) {
      //   consoles= await Promise.all(
      //     videoGameDto.consoleId.map(async (consoleId) => {
      //       const console = await this.consoleRepository.findOne({ where: { id: consoleId } });
      //       if (!console) {
      //         throw new NotFoundException(`Consola con ID ${consoleId} no encontrada`);
      //       }
      //       return console;
      //     })
      //   );
      // }
      // Si los campos existen, actualiza los campos necesarios.
      if (videoGameDto.name) videoGame.name = videoGameDto.name;
      if (videoGameDto.description) videoGame.description = videoGameDto.description;
      if (videoGameDto.images) videoGame.images = videoGameDto.images;
  
      // Actualiza la asociación con las categorías y la compañía
      videoGame.categoria=categories ;
      videoGame.company = company;
      videoGame.console = console;
      // Guarda los cambios en la base de datos.
      await this.videoGameRepository.save(videoGame);
  
      return videoGame;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error en la actualización del video juego: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Eliminar una ficha video juego

  async remove(id: number): Promise<VideoGame> {
    try {
      // Buscar el video juego por su ID
      const videoGame = await this.findOne(id);

      if (!videoGame) {
        throw new NotFoundException(`Video Juego con ID ${id} no encontrada.`);
      }

      // Eliminar la asociación con categoria, company, console, etc
      //para que estas no se elimine al eliminar al videoGame
      //Asignar un valor por defecto
      videoGame.categoria = null;
      videoGame.company = null;
      videoGame.console = null;
      // Guardar los cambios en la base de datos
      await this.videoGameRepository.save(videoGame);

      // Eliminar entidades asociadas
      await this.videoGameRepository.remove(videoGame);

      return videoGame;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la eliminacion del video Juego: ' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
}

