import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VideoGame } from 'src/video_games/entities/video_game.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VideoGame, (videoGame) => videoGame.ratings)
  videoGame: VideoGame;

  @ManyToOne(() => User, (user) => user.rating)
  user: User;

  @Column()
  value: number;  // Calificación de 0 a 5
}
export default Rating