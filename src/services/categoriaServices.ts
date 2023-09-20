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
      newCategoria.fk_idsecretaria = categoria.fk_idsecretaria

      const response = await CategoriaRepository.save(newCategoria)
      console.log(response)
      return {response : "categoria cadastrada com sucesso !!"}

    }catch(err){
        console.log(err)
        return {erro:"erro ao cadastrar categoria"}
    }
  }
  
}
