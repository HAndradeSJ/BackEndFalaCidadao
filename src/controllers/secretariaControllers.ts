import { Request, Response } from "express"
import { SecretariaServices } from "../services/secretariaServices"

 export class SecretariaController{
  private static instace :  SecretariaController
  private constructor(){}

  public static Instance() : SecretariaController{
    if(!SecretariaController.instace){
      SecretariaController.instace = new SecretariaController()
    }
    return SecretariaController.instace
  }

  public async createControllers(req: Request, res: Response){
    try{
        const secretaria = req.body
        if(!secretaria){
          return res.status(404).send({eror:"pârametros ausentes"})
        }
        const createSecretaria = await SecretariaServices.Instance().SecretariaCreate
        console.log(createSecretaria)
        return res.status(200).send({response : 'secretaria cadastra com sucesso !'})
    }catch(err){
      console.log(err)
      return res.status(400).send({erro:"Não foi possivel cirar secretaria"})
    }
  }

}
