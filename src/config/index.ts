import express, { Express } from "express";
import cor from 'cors'
import morgan from 'morgan'

import UserRoutes from "../routes/userRoutes";
import AuthRoutes from "../routes/authRoutes";
import { VerifyToken } from "./verifyToken";

const app : Express = express();
app.use(cor());
app.use(express.json());
app.use(morgan("combined"));

app.use('/user', VerifyToken)
app.use('/user',UserRoutes.userRouter)
app.use('/auth',AuthRoutes.authRouter)


export default app