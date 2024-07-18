import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { VideoGame } from './entities/video_game.entity';
import { VideoGameDto } from './dto/create-video_game.dto';
import { UpdateVideoGameDto } from './dto/update-video_game.dto';
import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class VideoGameService {
  constructor(
    @InjectRepository(VideoGame)
    private videoGameRepository: Repository<VideoGame>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<VideoGame[]> {
    try {
      const criterio: FindManyOptions = { relations: ['categoria', 'company'] };
      const videoGames: VideoGame[] = await this.videoGameRepository.find(criterio);
      return videoGames;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error en la búsqueda de los video juegos: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<VideoGame> {
    try {
      const criterio: FindOneOptions = { relations: ['categoria', 'company'], where: { id: id } };
      const videoGame = await this.videoGameRepository.findOne(criterio);
      if (!videoGame) {
        throw new NotFoundException(`Video Juego con ID ${id} no encontrado`);
      }
      return videoGame;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Error en la búsqueda del video juego: ${error.message}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByName(name: string): Promise<VideoGame> {
    try {
      const criterio: FindOneOptions = { relations: ['categoria', 'company'], where: { name: name } };
      const videoGame = await this.videoGameRepository.findOne(criterio);
      if (!videoGame) {
        throw new NotFoundException(`Video Juego con nombre: ${name} no encontrado`);
      }
      return videoGame;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Error en la búsqueda del video juego: ${error.message}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByCategory(name: string): Promise<VideoGame[]> {
    try {
      const criterio: FindManyOptions = {
        relations: ['categoria'],
        where: {
          categoria: {
            name: name,
          },
        },
      };
      const videoGames = await this.videoGameRepository.find(criterio);
      if (!videoGames || videoGames.length === 0) {
        throw new NotFoundException(`No se encontraron videojuegos para la categoría: ${name}`);
      }
      return videoGames;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Error en la búsqueda de los video juegos: ${error.message}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(videoGameDto: VideoGameDto): Promise<VideoGame> {
    try {
      const videoGame = await this.videoGameRepository.save(new VideoGame(videoGameDto.name, videoGameDto.description, videoGameDto.qualification, videoGameDto.images));
      const videoGameSave = await this.videoGameRepository.save(videoGame);
      return videoGameSave;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error en la creación del video juego: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, videoGameDto: UpdateVideoGameDto): Promise<VideoGame> {
    try {
      const videoGame = await this.findOne(id);
      if (!videoGame) {
        throw new NotFoundException(`Video juego con ID ${id} no encontrado`);
      }

      let categories: Category[] = [];
      if (videoGameDto.categoryId && videoGameDto.categoryId.length > 0) {
        categories = await Promise.all(
          videoGameDto.categoryId.map(async (categoryId) => {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
              throw new NotFoundException(`Categoría con ID ${categoryId} no encontrada`);
            }
            return category;
          }),
        );
      }

      const company = await this.companyRepository.findOne({ where: { id: videoGameDto.companyId } });

      if (videoGameDto.name) videoGame.name = videoGameDto.name;
      if (videoGameDto.description) videoGame.description = videoGameDto.description;
      if (videoGameDto.qualification) videoGame.qualification = videoGameDto.qualification;
      if (videoGameDto.images) videoGame.images = videoGameDto.images;

      videoGame.categoria = categories;
      videoGame.company = company;

      await this.videoGameRepository.save(videoGame);

      return videoGame;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Error en la actualización del video juego: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<VideoGame> {
    try {
      const videoGame = await this.findOne(id);
      if (!videoGame) {
        throw new NotFoundException(`Video Juego con ID ${id} no encontrado`);
      }

      videoGame.categoria = null;
      videoGame.company = null;

      await this.videoGameRepository.save(videoGame);
      await this.videoGameRepository.remove(videoGame);

      return videoGame;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Error en la eliminación del video Juego: ${error.message}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}