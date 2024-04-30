import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length:16 })
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column({ default: "user" })
    rol: string;
    
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    create_time: Date;

    @OneToMany(()=>Comment, comments => comments.user)
    comments:Comment[]
}