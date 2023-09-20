import {v4} from 'uuid'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'

import { Usuarios } from '../models/userModels';
import { userDto } from '../dto/userDto';
import { userRepository } from '../repostitory/userRepository';




export class UserServices{
  private static instance: UserServices
  private constructor() {}

  public static Instance(): UserServices {
    if (!UserServices.instance) {
      UserServices.instance = new UserServices()
    }
    return UserServices.instance
  }

  public async singUp(valid:userDto){
    try{
      const newUser = new Usuarios()
      newUser.idusuario = v4()
      newUser.nome = valid.nome
      newUser.idade = valid.idade
      newUser.cpf = valid.cpf
      newUser.telefone = valid.telefone
      newUser.funcao = valid.funcao
      newUser.email = valid.email

      const hashDigest = sha256(valid.senha)
      const hmacDigest = await Base64.stringify(hmacSHA512(hashDigest,"chavesecreta"))
      newUser.senha = hmacDigest

      const token =  await jwt.sign({email :newUser.email,senha :newUser.senha},"pao")
      newUser.auth = token
      console.log(newUser)
      const response  = await userRepository.save(newUser)
      if(response){
        return {success:"Usuário cadastrado com sucesso !"}
      }
    }catch(error){
     console.log(error)
    }
  }

  public async loginUser(userEmail:string, userSenha:string){
    try{
      const hashDigest = sha256(userSenha)
      const senhaHash = Base64.stringify(hmacSHA512(hashDigest,'chavesecreta'))
      const findUser = await userRepository.findOneBy({
        email: userEmail,
        senha: senhaHash
      })
      if(findUser){
        const token = jwt.sign({email:findUser.email,senha:findUser.senha,id:findUser.idusuario},'pao')
        return token
      }
      else{
        return {error:"Essa conta não está registrada "}
      }

    

    }catch(error){
      console.log(error)
      return {error:"Não foi possivel logar "}
    }
  }
}