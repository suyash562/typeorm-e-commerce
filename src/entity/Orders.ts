import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity({name : "orders_2k9"})
export class Orders{
    @PrimaryGeneratedColumn()
    id! : number;

    @ManyToOne(()=>User, (user) => user.orders, {onDelete : "CASCADE", onUpdate : "CASCADE"})
    user! : User;
    
    @OneToMany(()=>OrderItem, (orderItem) => orderItem.orders)
    orderItem! : OrderItem[];


    constructor(user : User){
        this.user = user;
    }
}