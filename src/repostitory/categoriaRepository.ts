import { conectedDatabase } from "../authenticad";
import { Categoria } from "../models/categoriaModels";



export const CategoriaRepository = conectedDatabase.getRepository(Categoria)