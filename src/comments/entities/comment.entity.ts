import { User } from "src/users/entities/user.entity"
import { VideoGame } from "src/video_games/entities/video_game.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comment: string

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn()
    user: User

    @ManyToOne(() => VideoGame, videoGame => videoGame.comments)
    videoGame: VideoGame

}
