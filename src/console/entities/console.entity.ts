import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('consoles')
export class Console {
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    name:string
    
    @Column()
    year:number

    // @OneToMany(()=> Videogame, videogame=>videogame.console)
    // videoGame:Videogame[]
}
