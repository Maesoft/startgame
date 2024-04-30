import { Category } from "src/category/entities/category.entity";
import { Company } from "src/company/entities/company.entity";
import { Entity, PrimaryGeneratedColumn,Column,ManyToMany,JoinTable, ManyToOne, JoinColumn } from "typeorm";
@Entity('video_game')
export class VideoGame {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    qualification:number
    @Column()
    images: string
@ManyToMany(()=>Category,(categoria)=>categoria.videoGame)
@JoinTable()
categoria: Category[]
@ManyToOne(()=>Company,(company)=>company.videoGame)
@JoinColumn()
    company: Company

    constructor(name: string, description: string,qualification:number,images: string) {
        this.name = name;
        this.description = description;
        this.qualification = qualification;
        this.images = images;
    
}

}

