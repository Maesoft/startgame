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
    const criterio: FindManyOptions = { relations: ['videoGame'] };
    const category: Category[] = await this.categoryRepository.find(criterio)


    return category
  }


  //Traer categorias por id y su juego asociado
  async findOne(id: number): Promise<Category> {
    const criterio: FindOneOptions = { relations: ['videoGame'], where: { id: id } }
    const category = await this.categoryRepository.findOne(criterio)
    if (!category) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`)
    }
    return category;
  }

  //Crear categoria
  async create(/*id: number,*/categoryDto: CreateCategoryDto): Promise<Category> {
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
      // Primero, verifica si la categoria existe.
      const category = await this.findOne(id);
      if (!category) {
        throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
      }
      // Verifica si videoGame existe.
      const videoGame = await this.videoGameRepository.findOne({ where: { id: categoryDto.videoGameId/*tambien se puede poner clase.profesor.id*/ } });
      if (!videoGame) {
        throw new NotFoundException(`Categoria con ID ${categoryDto.videoGameId} no encontrada`);
      }



      // Si los campos existen, actualiza los campos necesarios.
      if (categoryDto.name) category.name = categoryDto.name;
      if (categoryDto.videoGameId) videoGame.id = categoryDto.videoGameId;
      
      // Actualiza la asociación con videoGame
      category.videoGame = [videoGame];

      // Guarda los cambios en la base de datos.
      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Error en la actualización de la categoria: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Eliminar una categoria

  async remove(id: number): Promise<Category> {
    try {
      // Buscar la categoria por su ID
      const category = await this.findOne(id);

      if (!category) {
        throw new NotFoundException(`Categoria con ID ${id} no encontrada.`);
      }

      // Eliminar la asociación con videoGame
      //para que estas no se elimine al eliminar al profesor
      //Asignar un valor por defecto
      // profesor.ciudad = null;
      // profesor.clase = null;
      // Guardar los cambios en la base de datos
      await this.categoryRepository.save(category);

      // Eliminar al profesor
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

