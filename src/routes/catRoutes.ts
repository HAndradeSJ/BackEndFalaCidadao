import { Router } from "express";
import { CategoriaController } from "../controllers/categoriaControllers";


const catRouter = Router()

catRouter.post('/create',CategoriaController.Instance().CategoriaCreate)
catRouter.get('/getall',CategoriaController.Instance().CategoriaGetAll)


export default {catRouter}