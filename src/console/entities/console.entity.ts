import { VideoGame } from "src/video_games/entities/video_game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('consoles')
export class Console {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    year: number

    @OneToMany(() => VideoGame, videogame => videogame.console)
    videoGame: VideoGame[]
}
