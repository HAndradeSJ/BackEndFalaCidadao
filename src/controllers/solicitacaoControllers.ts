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

  public async getMySolicitacao(req:Request, res:Response){
    try{
      const {id}  = (req as any).authUser

      const getBySolicitacao = await SolicitacaoServices.Instance().getBySoliciId(id)
      return res.status(200).send({response:getBySolicitacao})
    }catch(err){
      res.status(400).send({erro:"Ocorreu um erro ao pegar suas solicitacao"})
  }
}


public async deleteSolicitacao (req: Request, res: Response){
  try{
    const id = req.params.id
  
    if(!id){
      return res.status(404).send({error:"Solicitação não foi enviada "})
    }
    const response = await SolicitacaoServices.Instance().deleteSolici(id)
    return res.status(200).send({response : response})
  }catch(err){
    console.log(err)
    res.status(400).end({erro:"Erro no interno"})
  }
}


public async EncerramentoSolicitacao (req: Request, res: Response){
  try{
    const {id}  = (req as any).authUser
    const {protocolo,justificativa} = req.body

    if(!protocolo){
      return res.status(404).send({error:"protocolo não foi informado"})
    }
    if(!justificativa){
      return res.status(404).send({error:"justificativa não foi informado"})
    }
    const response = await SolicitacaoServices.Instance().encerrarSolici(protocolo,justificativa,id)
    return res.status(200).send({data:response})
   
  }catch(err){
    console.log(err)
    res.status(400).end({erro:"Erro no interno"})
  }
}

}