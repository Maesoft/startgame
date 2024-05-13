import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { error } from 'console';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { VideoGame } from 'src/video_games/entities/video_game.entity';


@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private categoryRepository: Repository<Category>,
    @InjectRepository(VideoGame)
    private readonly videoGameRepository: Repository<VideoGame>) { }


  //Traer todas las categorias y sus juegos
  async findAll(): Promise<Category[]> {
    try {
      const criterio: FindManyOptions = { relations: ['videoGame'] };
      const category: Category[] = await this.categoryRepository.find(criterio)
      return category
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de la categoria' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }

  //Traer categorias por id y su juego asociado
  async findOne(id: number): Promise<Category> {
    try {
      const criterio: FindOneOptions = { relations: ['videoGame'], where: { id: id } }
      const category = await this.categoryRepository.findOne(criterio)
      if (!category) {
        throw new NotFoundException(`Categoria con ID ${id} no encontrada`)
      }
      return category;
    } catch
    (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de la categoria' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
  //Traer categorias por name
  async findByName(name: string): Promise<Category> {
    try {
      const criterio: FindOneOptions = { relations: ['videoGame'], where: { name: name } }
      const category = await this.categoryRepository.findOne(criterio)
      if (!category) {
        throw new NotFoundException(`Categoria con nombre ${name} no encontrada`)
      }
      return category;
    }
    catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la busqueda de la categoria' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
  //Crear categoria
  async create(categoryDto: CreateCategoryDto): Promise<Category> {
    try {
      // Crear una nueva instancia de la categoria con los datos del DTO
      const category = await this.categoryRepository.save(new Category(categoryDto.name))

      // Guardar la nueva categoria en la base de datos
      const categorySave = await this.categoryRepository.save(category);

      return categorySave;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la creacion de la categoria' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }


  //Editar la categoria y los juegos de la categoria con dto
  async update(id: number, categoryDto: UpdateCategoryDto): Promise<Category> {
    try {
      // Primero, verifica si la categoría existe.
      const category = await this.findOne(id);
      if (!category) {
        throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
      }
  
      // Verifica si existen videojuegos relacionados.
          let videoGames: VideoGame[] = [];
          if (categoryDto.videoGameId&& categoryDto.videoGameId.length > 0) {
            videoGames = await Promise.all(
              categoryDto.videoGameId.map(async (videGameId) => {
                const game = await this.videoGameRepository.findOne({ where: { id: videGameId } });
                if (!category) {
                  throw new NotFoundException(`Categoría con ID ${videoGames} no encontrada`);
                }
                return game;
              })
            );
          }
  
      // Si los campos existen, actualiza los campos necesarios.
      if (categoryDto.name) category.name = categoryDto.name;
  
      // Agrega los videojuegos relacionados al array existente.
      category.videoGame=videoGames  
      // Guarda los cambios en la base de datos.
      await this.categoryRepository.save(category);
  
      return category;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error en la actualización de la categoría: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
/*
  //Editar ficha video juego
  
      //Verificamos si la compañia existe
  
      // Si los campos existen, actualiza los campos necesarios.
      if (videGameDto.name) videoGame.name = videGameDto.name;
      if (videGameDto.description) videoGame.description = videGameDto.description;
      if (videGameDto.qualification) videoGame.qualification = videGameDto.qualification;
      if (videGameDto.images) videoGame.images = videGameDto.images;
  
      // Actualiza la asociación con las categorías y la compañía
      videoGame.categoria = categories;
      videoGame.company = company;
  
      // Guarda los cambios en la base de datos.
      await this.videoGameRepository.save(videoGame);
  
      return videoGame;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error en la actualización del video juego: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/
  //Eliminar una categoria

  async remove(id: number): Promise<Category> {
    try {
      // Buscar la categoria por su ID
      const category = await this.findOne(id);

      if (!category) {
        throw new NotFoundException(`Categoria con ID ${id} no encontrada.`);
      }

      // Eliminar la asociación con videoGame
      //Asignar un valor por defecto
      category.videoGame = null;
      // Guardar los cambios en la base de datos
      await this.categoryRepository.save(category);

      // Eliminar la categoria
      await this.categoryRepository.remove(category);

      return category;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Error en la eliminacion de la categoria: ' + error },
        HttpStatus.NOT_FOUND
      );
    }
  }
}

