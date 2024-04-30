
import { VideoGame } from "src/video_games/entities/video_game.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
@Entity('category')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToMany(() => VideoGame, (videoGame) => videoGame.categoria)
    videoGame: VideoGame[];
    constructor(name: string) {
        this.name = name;
    }
}
