import { Router } from "express";
import { SecretariaController } from "../controllers/secretariaControllers";


const secreRouter = Router()

secreRouter.post('/create',SecretariaController.Instance().createControllers)


export default {secreRouter}