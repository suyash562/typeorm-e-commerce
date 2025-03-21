import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name : "profile_2k9"})
export class Profile{
    @PrimaryGeneratedColumn()
    id! : number;
    
    @Column()
    imageUrl! : string;

    @OneToOne(()=>User, {cascade : true, onDelete : "CASCADE", onUpdate : "CASCADE"})
    @JoinColumn()
    user! : User;

    constructor(imageUrl : string){
        this.imageUrl = imageUrl;
    }
}