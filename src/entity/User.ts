import { Check, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Orders } from "./Orders";

@Entity({name : "user_2k9"})
export class User{
    @PrimaryGeneratedColumn()
    id! : number;

    @Column({unique : true})
    email! : string;
    
    @Column()
    password! : string;

    @OneToOne(()=>Profile)
    profile! : Profile;

    @OneToMany(()=>Orders, (orders) => orders.user)
    orders! : Orders[];


    constructor(email : string , password : string, profile : Profile){
        this.email = email;
        this.password = password;
        this.profile = profile;
    }
}