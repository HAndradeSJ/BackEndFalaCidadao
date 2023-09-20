import { v4 } from "uuid"
import { Secretaria } from "../models/secretariaModels"
import { secretariaDto } from "../dto/secretariaDto"
import { SecretariaRepository } from "../repostitory/secretariaRepository"

export class SecretariaServices{
  private static instance: SecretariaServices
  private constructor() {}

  public static Instance(): SecretariaServices {
    if (!SecretariaServices.instance) {
      SecretariaServices.instance = new SecretariaServices()
    }
    return SecretariaServices.instance
  }

  public async SecretariaCreate(secretaria:secretariaDto,id:string){
    try{
      const newSecretaria = new Secretaria()
      newSecretaria.idsecretaria = v4()
      newSecretaria.nome = secretaria.nome
      newSecretaria.descricao = secretaria.descricao
      newSecretaria.responsavel = secretaria.responsavel
      newSecretaria.telefone = secretaria.telefone
      newSecretaria.fk_idusuario  = id

      const saveSecretaria = await SecretariaRepository.save(newSecretaria)
      return saveSecretaria

    }catch(err){
        console.log(err)
    }
  }
  
}
