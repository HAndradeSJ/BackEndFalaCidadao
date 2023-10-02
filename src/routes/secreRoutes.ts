import { Router } from "express";
import { SecretariaController } from "../controllers/secretariaControllers";


const secreRouter = Router()

secreRouter.post('/create',SecretariaController.Instance().createControllers)
secreRouter.get('/getall',SecretariaController.Instance().SecretariaGetAll)


export default {secreRouter}