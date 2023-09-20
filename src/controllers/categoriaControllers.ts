import { Request, Response } from "express"
import { CategoriaServices } from "../services/categoriaServices"

export class CategoriaController{
  private static instace :  CategoriaController
  private constructor(){}

  public static Instance() : CategoriaController{
    if(!CategoriaController.instace){
      CategoriaController.instace = new CategoriaController()
    }
    return CategoriaController.instace
  }

  public async CategoriaCreate(req:Request, res:Response){
    try{
      const categoria = req.body

      if(!categoria){
        res.status(400).send({message:"Dados inconpletos"})
      }
      const saveCategoria = await CategoriaServices.Instance().CategoriaCreate(categoria)
      return res.send(saveCategoria)

    }catch(err){
      return res.status(400).send({erro:"Erro no interno do servidor"})
    }
  }
}