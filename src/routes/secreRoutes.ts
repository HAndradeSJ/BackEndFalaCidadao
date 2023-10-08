import { Router } from "express";
import { SecretariaController } from "../controllers/secretariaControllers";


const secreRouter = Router()

secreRouter.post('/create',SecretariaController.Instance().createControllers)
secreRouter.get('/getall',SecretariaController.Instance().secretariaGetAll)
secreRouter.delete('/delete/:id',SecretariaController.Instance().deleteSecretaria)


export default {secreRouter}