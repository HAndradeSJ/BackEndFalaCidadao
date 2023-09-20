import { Request, Response,  } from "express"
import { SolicitacaoServices } from "../services/solicitacaoServices"
export class SolicitacaoController{
  private static instace :  SolicitacaoController
  private constructor(){}

  public static Instance() : SolicitacaoController{
    if(!SolicitacaoController.instace){
      SolicitacaoController.instace = new SolicitacaoController()
    }
    return SolicitacaoController.instace
  }

  public async SolicitacaoCreate(req: Request, res: Response){
    try{
      const solicitacao = req.body
      console.log(req.body)
      if(!solicitacao){
        return res.status(400).send({erro:"Falta Informação !"})
      }
      const {id}  = (req as any).authUser
  
      const save = await SolicitacaoServices.Instance().SolicitacaoCreate(solicitacao,id)
      console.log(save)

      return res.status(200).send({response:"solicitação cadastrada com sucesso !"})
    }catch(err){
      console.log(`problema no controller não foi possivel registrar uma solicitacao ${err}`)
      return res.status(400).send({erro:"Problema ao cadastrar solicitação"})
    }
  }

  public async getAllsolicitacao(req: Request, res: Response){
    try{

    }
    catch(err){
      console.log(err)
    }
  }

}