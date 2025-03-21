import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders";
import { Product } from "./Product";

@Entity({name : "order_item_2k9"})
export class OrderItem{
    @PrimaryGeneratedColumn()
    id! : number;

    @Column()
    quantity! : number;
    
    @Column()
    orderPrice! : number;
    
    @ManyToOne(()=>Orders, (orders) => orders.orderItem, {cascade : true, onDelete : "CASCADE", onUpdate : "CASCADE"})
    orders! : Orders;
    
    @ManyToOne(()=>Product, (product) => product.orderItem , {onDelete : "CASCADE", onUpdate : "CASCADE"})
    product! : Product;

    
    constructor(quantity : number, orderPrice : number, orders : Orders ,product : Product){
        this.quantity = quantity;
        this.orderPrice = orderPrice;
        this.product = product;
        this.orders = orders;
    }
}