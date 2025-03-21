import { DataSource, DataSourceOptions } from "typeorm";
import { Profile } from "../entity/Profile";
import { User } from "../entity/User";
import { Orders } from "../entity/Orders";
import { Product } from "../entity/Product";
import { OrderItem } from "../entity/OrderItem";


const config : DataSourceOptions = {
    type : "mssql",
    host : "dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com",
    port : 1982,
    database : "JIBE_Main_Training",
    username : "j2",
    password : "123456",
    synchronize : true,
    // logging : true,
    options : {
        encrypt : true,
        trustServerCertificate : true
    },
    entities : [User, Profile, Orders, Product, OrderItem]
}

export const AppDataSource = new DataSource(config);