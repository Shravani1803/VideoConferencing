import express from 'express';
import cors from 'cors';
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from 'mongoose';
import { connectToSocket } from './controllers/socketmanager.js';
import userRoutes from "./routes/users.routes.js";

const app=express();
const server =createServer(app);
const io=connectToSocket(server);



app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended:true,limit:"50mb"}));
app.use("/api/v1/users",userRoutes);


const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb://shravanisanjaygulhane:shravani@ac-ujcu9u2-shard-00-00.zuzsmyv.mongodb.net:27017,ac-ujcu9u2-shard-00-01.zuzsmyv.mongodb.net:27017,ac-ujcu9u2-shard-00-02.zuzsmyv.mongodb.net:27017/sample-db?ssl=true&replicaSet=atlas-tba9qy-shard-0&authSource=admin&appName=Cluster0")

    console.log(`Mongodb connected successfully: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    });
};

start();