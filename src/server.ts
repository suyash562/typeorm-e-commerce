import express, { Application }  from "express";
import { AppDataSource } from "./configuration/database";
import { userRouter } from "./routes/userRoutes";
import "reflect-metadata";

const app : Application = express();

app.use(express.json());
app.use("/user",userRouter);

AppDataSource.initialize().then(async ()=>{
    app.listen(3200, () => {
        console.log("Server listening on port 3200");
    })
})
.catch(err => {
    console.log(err);
})