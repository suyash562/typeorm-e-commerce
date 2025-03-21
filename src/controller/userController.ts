import { Request, Response } from "express";
import { addProduct, addUserRepo, getOrderItemsGreaterThanAvgPriceRepo, getUserOrders, placeOrder } from "../repository/userRepository";


export const addUserController = async (req : Request, res : Response) => {
    try{
        const {user} = req.body;
        
        const result = await addUserRepo(user);
        if(result){
            res.status(201).send(result);
        }
        else{
            res.status(500).send(result);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export const orderProductController = async (req : Request, res : Response) => {
    try{
        const {email, productId, orderId} = req.body;
        
        const result = await placeOrder(email, productId, orderId);
        if(result){
            res.status(201).send(result);
        }
        else{
            res.status(500).send(result);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export const addProductController = async (req : Request, res : Response) => {
    try{
        const {product} = req.body;
        
        const result = await addProduct(product);
        if(result){
            res.status(201).send(result);
        }
        else{
            res.status(500).send(result);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export const getUserOrdersController = async (req : Request, res : Response) => {
    try{
        const {email} = req.body;
        
        const result = await getUserOrders(email);
        if(result){
            res.status(201).send(result);
        }
        else{
            res.status(500).send(result);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export const getOrderItemsGreaterThanAvgPrice = async (req : Request, res : Response) => {
    try{
    
        const result = await getOrderItemsGreaterThanAvgPriceRepo();
        if(result){
            res.status(201).send(result);
        }
        else{
            res.status(500).send(result);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
