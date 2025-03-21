import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity({name : "product_2k9"})
export class Product{
    @PrimaryGeneratedColumn()
    id! : number;

    @Column()
    productName! : string;

    @Column()
    productPrice! : number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItem! : OrderItem[];

    constructor(productName : string, productPrice : number){
        this.productName = productName;
        this.productPrice = productPrice;
    }
}