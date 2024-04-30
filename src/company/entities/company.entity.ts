import { VideoGame } from "src/video_games/entities/video_game.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
@Entity('company')
export class Company {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    siteUrl: string;
    @OneToMany(() => VideoGame, (videoGame) => videoGame.company)
    videoGame: VideoGame[];
    constructor(name: string, siteUrl: string) {
        this.name = name;
        this.siteUrl = siteUrl;
    }
}
