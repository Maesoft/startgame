import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { error } from 'console';
import { VideoGame } from './entities/video_game.entity';
import { VideoGameDto } from './dto/create-video_game.dto';
import { UpdateVideoGameDto } from './dto/update-video_game.dto';
import { Category } from 'src/category/entities/category.entity';


@Injectable()
export class VideoGameService {
  constructor(@InjectRepository(VideoGame)
  private videoGameRepository: Repository<VideoGame>,
@InjectRepository(Category)
private readonly categoryRepository:Repository<Category>) { }


  //Traer todos sus juegos
  async findAll(): Promise<VideoGame[]> {
    const criterio: FindManyOptions = { relations: ['categoria', 'company'] };
    const videoGame: VideoGame[] = await this.videoGameRepository.find(criterio)
   return this.videoGameRepository.find(criterio);
  }

  //Traer video juegos por id y su juego asociado
  async findOne(id: number): Promise<VideoGame> {
    const criterio: FindOneOptions = { relations: ['categoria','company'], where: { id: id } }
    const videoGame = await this.videoGameRepository.findOne(criterio)
    if (!videoGame) {
      throw new NotFoundException(`Video Juego con ID ${id} no encontrado`)
    }
    return videoGame;
  }

  //Crear ficha video juego
  async create(/*id: number,*/videoGameDto: VideoGameDto): Promise<VideoGame> {
    try {
      //   // Obtener la compania correspondiente por su ID
      //  const clase = await this.claseRepository.findOne({ where: { id: id } });
      //   if (!clase) {
      //     console.log(clase)
      //     throw new NotFoundException(`Clase con ID ${id} no encontrado`);
      //   }
      // Crear una nueva instancia de Compania con los datos del DTO
      const videoGame = await this.videoGameRepository.save(new VideoGame(videoGameDto.name, videoGameDto.description, videoGameDto.qualification, videoGameDto.images))
      // Asociar al Profesor con la clase obtenido
      // profesor.clase = clase;

      // Guardar nuevo juego en la base de datos
      const videoGameSave = await this.videoGameRepository.save(videoGame);

      return videoGameSave;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la creacion del video juego' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }


  //Editar ficha video juego
  async update(id: number, videGameDto: VideoGameDto): Promise<VideoGame> {
    try {
      // Primero, verifica si el video juego existe.
      const videoGame = await this.findOne(id);
      if (!videoGame) {
        throw new NotFoundException(`Video juego con ID ${id} no encontrada`);
      }
      //Verificamos si la categoria existe
       const categoria=await this.categoryRepository.findOne({where:{id:videGameDto.categoryId}})
      // Si los campos existen, actualiza los campos necesarios.
      if (videGameDto.name) videoGame.name = videGameDto.name
      if (videGameDto.description) videoGame.description = videGameDto.description
      if (videGameDto.qualification) videoGame.qualification = videGameDto.qualification
      if (videGameDto.images) videoGame.images = videGameDto.images
      if(videGameDto.categoryId) categoria.id=videGameDto.categoryId

      // Actualiza la asociación con la categoria
       videoGame.categoria = [categoria];

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

      // Eliminar la asociación con categoria
      //para que estas no se elimine al eliminar al videoGame
      //Asignar un valor por defecto
       videoGame.categoria = null;
      // videoGame.company = null;
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

