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

  public async SecretariaCreate(secretaria:secretariaDto){
    try{
      const newSecretaria = new Secretaria()
      newSecretaria.idssecretaria = v4()
      newSecretaria.nome = secretaria.nome
      newSecretaria.descricao = secretaria.descicao
      newSecretaria.responsavel = secretaria.responsavel
      newSecretaria.fk_idusuario = secretaria.fk_usuario

      const saveSecretaria = await SecretariaRepository.save(newSecretaria)
      return saveSecretaria

    }catch(err){
        console.log(err)
    }
  }
  
}
