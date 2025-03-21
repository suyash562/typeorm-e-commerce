import { Brackets } from "typeorm";
import { AppDataSource } from "../configuration/database"
import { OrderItem } from "../entity/OrderItem";
import { Orders } from "../entity/Orders";
import { Product } from "../entity/Product";
import { Profile } from "../entity/Profile";
import { User } from "../entity/User";

// const userRepo = AppDataSource.getRepository(User);

export const addUserRepo = async (user : User) => {
    try{        
        const profile = new Profile("");
        const newUser = new User(user.email, user.password, profile);
        return await AppDataSource.getRepository(User).save(newUser);
    }
    catch(err){
        console.log(err);
        return false;
    }
}

export const placeOrder = async (email : string, productId : number, orderId : number) => {
    const product = await AppDataSource.getRepository(Product).findOneBy({
        id : productId
    })
    const user = await AppDataSource.getRepository(User).findOneBy({
        email : email
    })
    if(product && user){
        let orders = await AppDataSource.getRepository(Orders).findOneBy({
            id : orderId
        })
        if(!orders){
            orders = new Orders(user);
        }
        else{
            const updateExistingOrderItemResult = await AppDataSource.getRepository(OrderItem)
                .createQueryBuilder("orderItem")
                .update()
                .set({
                    quantity : ()=>"quantity + 1",
                    orderPrice : () => "orderPrice + :productPrice"
                })
                .where({
                    orders : orders,
                    product : product
                })
                .setParameters({productPrice : product.productPrice})
                .execute();
            if(updateExistingOrderItemResult.affected != 0){
                return true;
            }
        }
        const orderItem = new OrderItem(1, product.productPrice, orders , product);
        await AppDataSource.getRepository(OrderItem).save(orderItem);
        return true;
    }
    return false;
}

export const addProduct = async (product : Product) => {
    const result = await AppDataSource.getRepository(Product).save(product)
    return result;
}

export const getUserOrders = async (email : string) => {
    try{
        const result = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.orders", "orders")
        .where({email : email})
        .getOne()

        if(result){
            let ordersId : number[] = [];
            result.orders.forEach(order => {
                ordersId.push(order.id);
            })
            
            const orders = AppDataSource.getRepository(Orders)
            .createQueryBuilder("orders")
            .leftJoinAndSelect("orders.orderItem", "orderItem")
            .where("orders.id in (:...ordersId)", {ordersId : ordersId})
            .getMany()
            
            return orders;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

export const getOrderItemsGreaterThanAvgPriceRepo = async () => {
    try{
        const orderItemRepo = AppDataSource.getRepository(OrderItem);

        const result = await orderItemRepo
            .createQueryBuilder("orderItem")
            .where(new Brackets(qb => {
                const averagePrice = qb.andWhere(() => {
                                        const averagePrice = AppDataSource.getRepository(OrderItem).createQueryBuilder("orderItem")
                                            .subQuery()
                                            .select("AVG(orderItem.orderPrice)")
                                            .from(OrderItem, "orderItem")
                                            .getQuery();
                                            
                                            return "orderItem.orderPrice > " + averagePrice;
                                    })
                    return "orderItem.orderPrice > " + averagePrice;
            }))
            .getMany();

        // const result = await orderItemRepo
        //     .createQueryBuilder("orderItem")
        //     .where((qb) => {
        //         const averagePrice = qb
        //             .subQuery()
        //             .select("AVG(orderItem.orderPrice)")
        //             .from(OrderItem, "orderItem")
        //             .getQuery();
                    
        //             return "orderItem.orderPrice > " + averagePrice;
        //     })
        //     .getMany();
        
        return result;
    }
    catch(err){
        console.log(err);
        return false;
    }
}