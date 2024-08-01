import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Company } from "src/company/entities/company.entity";
import { Console } from "src/console/entities/console.entity";
import Rating from "src/raiting/entities/raiting.entity";

@Entity('video_game')
export class VideoGame {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    images: string;

    @ManyToMany(() => Category, (category) => category.videoGame)
    @JoinTable()
    categoria: Category[];
    @Column({ type: 'float', default: 0 })  // Nueva columna para la calificación media
    averageRating: number;
    @ManyToOne(() => Company, (company) => company.videoGame, { nullable: true })
    @JoinColumn()
    company: Company;

    @ManyToOne(() => Console, (console) => console.videoGame, { nullable: true })
    @JoinColumn()
    console: Console;

    @OneToMany(() => Comment, (comment) => comment.videoGame)
    @JoinColumn()
    comments: Comment[];
    
    @OneToMany(() => Rating, (ratings) => ratings.videoGame)
    @JoinColumn()
    ratings: Rating[];
    

    constructor(name: string, description: string, images: string) {
        this.name = name;
        this.description = description;
        this.images = images;
    }

}