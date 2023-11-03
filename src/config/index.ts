import express, { Express } from "express";
import cor from 'cors'
import morgan from 'morgan'


import UserRoutes from "../routes/userRoutes";
import AuthRoutes from "../routes/authRoutes";
import SoliciRoutes from "../routes/soliciRoutes";
import SecreRoutes from "../routes/secreRoutes";
import * as path from 'path';
import CatRoutes from "../routes/catRoutes";
import { VerifyToken } from "./verifyToken";


const app : Express = express();
app.use(cor());
app.use(express.json());  
app.use("/imagens",express.static(path.join(__dirname,'picture')));
app.use(morgan("combined"));
app.use('/user', VerifyToken)
app.use('/solicitacao', VerifyToken)
app.use('/secretaria', VerifyToken)
app.use('/user',VerifyToken)


app.use('/user',UserRoutes.userRouter)
app.use('/solicitacao',SoliciRoutes.soliciRouter)
app.use('/secretaria',SecreRoutes.secreRouter)
app.use('/categoria',CatRoutes.catRouter)
app.use('/auth',AuthRoutes.authRouter)


export default app