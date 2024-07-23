import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Company } from "src/company/entities/company.entity";
import { Console } from "src/console/entities/console.entity";

@Entity('video_game')
export class VideoGame {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })  // Permitir valores null
    qualification: number;

    @Column()
    images: string;

    @ManyToMany(() => Category, (category) => category.videoGame)
    @JoinTable()
    categoria: Category[];

    @ManyToOne(() => Company, (company) => company.videoGame, { nullable: true })
    @JoinColumn()
    company: Company;

    @ManyToOne(() => Console, (console) => console.videoGame, { nullable: true })
    @JoinColumn()
    console: Console;

    @OneToMany(() => Comment, (comment) => comment.videoGame)
    @JoinColumn()
    comments: Comment[];

    constructor(name: string, description: string, qualification: number, images: string) {
        this.name = name;
        this.description = description;
        this.qualification = qualification;
        this.images = images;
    }

}