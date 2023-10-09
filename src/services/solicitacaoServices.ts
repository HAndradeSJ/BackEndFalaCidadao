import { v4 } from "uuid"


import { SolicitacaoDto } from "../dto/soliciDto"
import { Solicitacao } from "../models/solicitacaoModels"
import { SolicitacaoRepository } from "../repostitory/solicitacaoRepository"


export class SolicitacaoServices{
  private static instace :  SolicitacaoServices
  private constructor(){}

  public static Instance() : SolicitacaoServices{
    if(!SolicitacaoServices.instace){
      SolicitacaoServices.instace = new SolicitacaoServices()
    }
    return SolicitacaoServices.instace
  }

  public async  SolicitacaoCreate(valid:SolicitacaoDto,id:string){
    try{
      const getLastProtocolo = await SolicitacaoRepository.createQueryBuilder('Solicitacao').orderBy('Solicitacao.log_criacao','DESC').getOne();
      const newSolicitacao = new Solicitacao()
      newSolicitacao.idsolicitacao = v4()
      newSolicitacao.fk_idusuario = id
      newSolicitacao.protocolo = getLastProtocolo == null ?  1 :getLastProtocolo?.protocolo + 1 
      newSolicitacao.status = ' Em Aberto'
      newSolicitacao.imagemUrl = valid.imagemUrl
      newSolicitacao.descricao = valid.descricao
      newSolicitacao.logradouro = valid.logradouro
      newSolicitacao.numero = valid.numero
      newSolicitacao.bairro = valid.bairro
      newSolicitacao.pontoderef = valid.pontoderef
      newSolicitacao.fk_idcategoria = valid.fk_idcategoria

      const save = await SolicitacaoRepository.save(newSolicitacao)
      return save
    
    }catch(err){
      console.log(err)
      return "Ocorreu um erro ao criar Solicitação"
    }
  }
    public async uploadPhoto(id:string,upload:any){
      try{
        const findSolici = await SolicitacaoRepository.findOneBy({fk_idusuario:id})
        if(findSolici){
          const newSolici = new Solicitacao()
          newSolici.imagemUrl = upload.path
          
          const uploadImage = await SolicitacaoRepository.update(findSolici.idsolicitacao,newSolici)
  
          if(uploadImage){
            return {response:"Imagem salva com sucesso !"}
          }
          else{
            return {erro:"occoreu um erro ao salvar no upload "}
          }
  
        }else{
          return 'Solicitação  não foi encontrada'
        }
      }catch(error){
        console.log(error)
        return {error:"Não foi pegar todos Usuarios"}
      }
  }

  public async getAll(){
    try{
        const findAll = await SolicitacaoRepository.find()
        return findAll
    }catch(error){
      console.log(error)
      return {erro:"occoreu um erro ao pegar tudo"}
    }
  }


  public async getBySoliciId(id:string){
    try{
       const findById = await SolicitacaoRepository.findBy({fk_idusuario:id})
       if(findById == null){
        return {erro:"Não a nenhuma solicitação "}
       }
       if(findById){
        return findById
       }
    }catch(err){
      console.log(err)
      return {erro:"occoreu um erro ao pegar suas solicitacao"}
    }
  }


  public async deleteSolici(id:string){
    try{
    const response =  await SolicitacaoRepository.delete({idsolicitacao:id})
      if (response.affected == 0 ){
        return {error:"Esse solicitação já foi deletada"}
      }
      return {sucess:"Solicitação deletada com sucesso !"}
    
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel deletar essa categoria "}
    }
  }

  public async encerrarSolici(protocolo:number, justificativa:string,id:string){
    try{
    const  findByProtocolo =  await SolicitacaoRepository.findOneBy({protocolo:protocolo})
    if(findByProtocolo == null){
      return {error:"Não existe um solicitação com esse protocolo"}
    }
    const newSolici = new Solicitacao()
    newSolici.fk_idagente = id
    newSolici.status = 'Encerrado'
    newSolici.justifictiva = justificativa

    const updateSolici = await SolicitacaoRepository.update(findByProtocolo.idsolicitacao,newSolici)
    console.log(updateSolici)
    return {sucesso:"Solicitação foi encerrada"}
    
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel alterar solicitação"}
    }
  }
}