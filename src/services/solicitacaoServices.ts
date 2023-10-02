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
      const newSolicitacao = new Solicitacao()
      newSolicitacao.idsolicitacao = v4()
      newSolicitacao.fk_idusuario = id
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
}