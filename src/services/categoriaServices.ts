import { v4 } from "uuid"

import { categoriaDto } from "../dto/categoriaDto"
import { Categoria } from "../models/categoriaModels"
import { CategoriaRepository } from "../repostitory/categoriaRepository"


export class CategoriaServices{
  private static instance: CategoriaServices
  private constructor() {}

  public static Instance(): CategoriaServices {
    if (!CategoriaServices.instance) {
      CategoriaServices.instance = new CategoriaServices()
    }
    return CategoriaServices.instance
  }

  public async CategoriaCreate(categoria:categoriaDto){
    try{
      const newCategoria = new Categoria()
      newCategoria.idcategoria = v4()
      newCategoria.categoria = categoria.categoria
      newCategoria.fksecretaria = categoria.fksecretaria

      const response = await CategoriaRepository.save(newCategoria)
      return response

    }catch(err){
        console.log(err)
    }
  }
  
}
