// Main file in the SERVER 
import { createlike, createuser , createvacation, exitsafemode } from './Utils/init';
// Main file in the SERVER 
import fileUpload from 'express-fileupload';
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import dal_mysql from "./Utils/dal_mysql";
import routeruser from './Routes/userController';
import routervacation from './Routes/vacationController';
import routerlike from './Routes/likeController';
import path from "path"

const server = express();

const currentPort = config.port;
dal_mysql.execute(createuser);
dal_mysql.execute(createvacation);
dal_mysql.execute(createlike);
dal_mysql.execute(exitsafemode);
server.use(fileUpload());
server.use(cors());
server.use(express.json());
server.use(express.static('./uploadPics'))
server.use(express.static(path.resolve(__dirname, '../frontend/build')));
server.use("/user",routeruser);
server.use("/vacation",routervacation);
server.use("/like",routerlike);
server.get('*',ErrorHandler, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
//2server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )