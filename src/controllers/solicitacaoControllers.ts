import { Request, Response,  } from "express"
import { SolicitacaoServices } from "../services/solicitacaoServices"
import { UserServices } from "../services/userServices"
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
  public async SolicitacaoUpload(req: Request, res: Response){
    try{
       const file =  req.file
       const {id}  = (req as any).authUser

       console.log(file)
       if(!file){
        return res.status(404).send({error:"arquivo não foi possível"})
       }

       const savephoto =  await SolicitacaoServices.Instance().uploadPhoto(id,file)
       console.log(savephoto)
       return res.status(200).send({response:"imagme registrada com sucesso !"})

    }catch(err){
      console.log(err)
      return res.status(500).send({error:"erro upload de photos"})
    }
  }

  public async getAllsolicitacao(req: Request, res: Response){
    try{
      const getall = await SolicitacaoServices.Instance().getAll();
      return res.status(200).send({response:getall})
    }
    catch(err){
      console.log(err)
    }
  }

}