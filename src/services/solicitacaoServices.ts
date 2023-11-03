import { v4 } from "uuid"


import { SolicitacaoDto } from "../dto/soliciDto"
import { Solicitacao } from "../models/solicitacaoModels"
import { SolicitacaoRepository } from "../repostitory/solicitacaoRepository"
import { Usuarios } from "../models/userModels"




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
      var year = new Date().getFullYear().toString();
      var month = new Date().getMonth().toString();
      var day = new Date().getDay().toString();
      var data_abertura = `${year}-${month}-${day}`
      var numchamada = `${year}/${month}-`;
      
      const getLastProtocolo = await SolicitacaoRepository.createQueryBuilder('Solicitacao').orderBy('Solicitacao.log_criacao','DESC').getOne();
      console.log(getLastProtocolo)
     const order =`${getLastProtocolo?.chamado.slice(-5)}`
     const number = parseInt(order)+1
     console.log(number)
      const newSolicitacao = new Solicitacao()
      newSolicitacao.idsolicitacao = v4()
      newSolicitacao.user  = new Usuarios();  
      newSolicitacao.user.idusuario = id;
      newSolicitacao.chamado = getLastProtocolo == null ? numchamada+1 :numchamada.concat(`${number}`)
      newSolicitacao.status = ' Em Aberto'
      newSolicitacao.data_abertura = data_abertura;
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
        console.log(upload)
         return upload.filename
          
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
      console.log(id)
       return await SolicitacaoRepository.findBy({user: { idusuario: id}})
       
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

  
  public async andamentoSolici(chamado:string){
    try{
      const  findByProtocolo =  await SolicitacaoRepository.findOneBy({chamado:chamado})
      if(findByProtocolo == null){
        return {error:"Não existe um solicitação com esse protocolo"}
      }
      const newSolici = new Solicitacao()
      
      newSolici.status = 'Em andamento'
     
      const updateSolici = await SolicitacaoRepository.update(findByProtocolo.idsolicitacao,newSolici)
      console.log(updateSolici)
      return {sucesso:"Solicitação está em andamento"}
      
      }catch(error){
        console.log(error)
        return {error:"Não foi possivel alterar solicitação"}
      }
  }

  public async encerrarSolici(protocolo:string, justificativa:string,id:string){
    try{
      var year = new Date().getFullYear().toString();
      var month = new Date().getMonth().toString();
      var day = new Date().getDay().toString();
      var data_encerramento =`${year}-${month}-${day}`

      const  findByProtocolo =  await SolicitacaoRepository.findOneBy({chamado:protocolo})
    if(findByProtocolo == null){
      return {error:"Não existe um solicitação com esse protocolo"}
    }
    const newSolici = new Solicitacao()
    newSolici.fk_idagente = id
    newSolici.status = 'Encerrado'
    newSolici.justifictiva = justificativa
    newSolici.data_encerramento = data_encerramento

    const updateSolici = await SolicitacaoRepository.update(findByProtocolo.idsolicitacao,newSolici)
    console.log(updateSolici)
    return {sucesso:"Solicitação foi encerrada"}
    
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel alterar solicitação"}
    }
  }


  public async recusarSolici(protocolo:string, justificativa:string,id:string){
    try{
      var year = new Date().getFullYear().toString();
      var month = new Date().getMonth().toString();
      var day = new Date().getDay().toString();
      var data_encerramento = `${year}-${month}-${day}`
      const  findByProtocolo =  await SolicitacaoRepository.findOneBy({chamado:protocolo})
    if(findByProtocolo == null){
      return {error:"Não existe um solicitação com esse protocolo"}
    }
    const newSolici = new Solicitacao()
    newSolici.fk_idagente = id
    newSolici.status = 'Recusada'
    newSolici.justifictiva = justificativa
    newSolici.data_encerramento = data_encerramento

    const updateSolici = await SolicitacaoRepository.update(findByProtocolo.idsolicitacao,newSolici)
    console.log(updateSolici)
    return {sucesso:"Solicitação foi recusada"}
    
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel alterar solicitação"}
    }
  }

  public async getByChamado(chamado: string){
    try{
      const findbychamado = await SolicitacaoRepository.findOneBy({chamado:chamado})
      if(findbychamado == null){
        return {error:"não existe nenhuma solicitção com esse chamado "}
      }
      return findbychamado
    }catch(error){
        console.log(error)
        return {error:"Não foi possivel pegar a solicitação por chamado "} 
    }
}
public async getSoliciAgente(id:string){
  try{
    console.log(id)
    const result = await SolicitacaoRepository
    .createQueryBuilder('solicitacao')
    .innerJoin('solicitacao.fk_idcategoria', 'categoria')
    .innerJoin('categoria.fk_idsecretaria', 'secretaria')
    .innerJoin('secretaria.fk_idusuario', 'usuarios')
    .where('usuarios.idusuario = :userId', { userId: id })
    .getMany();

  return result;
  }catch(error){
      console.log(error)
      return {error:"Não foi possivel pegar a solicitação do agente "} 
  }
}

}