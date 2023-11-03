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
       return res.status(200).send({response:savephoto})

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
      return res.status(200).json(getBySolicitacao);
    }catch(err){
      res.status(400).send({erro:"Ocorreu um erro ao pegar suas solicitacao"})
  }
}


public async getByChamado(req:Request, res:Response){
  try{
    const {chamado} = req.body

    if(!chamado){
      return res.status(400).send({ erro:"chamado não foi passado"})
    }

    const getChmado = await SolicitacaoServices.Instance().getByChamado(chamado)
    return res.status(200).send({response:getChmado})
  }catch(err){
    res.status(400).send({erro:"Ocorreu um erro ao pegar sua solicitacao"})
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

public async AndamentoSolicitacao (req: Request, res: Response){
  try{
    const {id}  = (req as any).authUser
    const {chamado} = req.body

    if(!chamado){
      return res.status(404).send({error:"chamado não foi informado"})
    }
    
    const response = await SolicitacaoServices.Instance().andamentoSolici(chamado)
    return res.status(200).send({data:response})
   
  }catch(err){
    console.log(err)
    res.status(400).end({erro:"Erro no interno"})
  }
}


public async EncerramentoSolicitacao (req: Request, res: Response){
  try{
    const {id}  = (req as any).authUser
    const {chamado,justificativa} = req.body

    if(!chamado){
      return res.status(404).send({error:"protocolo não foi informado"})
    }
    if(!justificativa){
      return res.status(404).send({error:"justificativa não foi informado"})
    }
    const response = await SolicitacaoServices.Instance().encerrarSolici(chamado,justificativa,id)
    return res.status(200).send({data:response})
   
  }catch(err){
    console.log(err)
    res.status(400).end({erro:"Erro no interno"})
  }
}


public async RecusarSolicitacao (req: Request, res: Response){
  try{
    const {id}  = (req as any).authUser
    const {chamado,justificativa} = req.body

    if(!chamado){
      return res.status(404).send({error:"protocolo não foi informado"})
    }
    if(!justificativa){
      return res.status(404).send({error:"justificativa não foi informado"})
    }
    const response = await SolicitacaoServices.Instance().recusarSolici(chamado,justificativa,id)
    return res.status(200).send({data:response})
   
  }catch(err){
    console.log(err)
    res.status(400).send({erro:"Erro no interno"})
  }
}
public async getSolicitacaoAgente (req: Request, res: Response){
  try{
    const {id}  = (req as any).authUser

    const response = await SolicitacaoServices.Instance().getSoliciAgente(id)
    return res.status(200).json(response)
   
  }catch(err){
    console.log(err)
    res.status(400).end({erro:"Erro no interno"})
  }
}

}