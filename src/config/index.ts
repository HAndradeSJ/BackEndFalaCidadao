import express, { Express } from "express";
import cor from 'cors'
import morgan from 'morgan'
import Routes from "../routes/userRoutes";

const app : Express = express();
app.use(cor());
app.use(express.json());
app.use(morgan("combined"));
app.use('/user',Routes.userRouter)


export default app