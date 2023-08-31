import {v4} from 'uuid'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'

import { Usuarios } from '../models/userModels';
import { userDto } from '../dto/userDto';
import { userRepository } from '../repostitory/userRepository';
import { json, response } from 'express';


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
      newUser.funcao = valid.funcao
      newUser.email = valid.email

      const hashDigest = sha256(newUser.senha)
      const hmacDigest = await Base64.stringify(hmacSHA512(hashDigest,"chavesecreta"))
      newUser.senha = hmacDigest

      const token =  await jwt.sign({email :newUser.email,senha :newUser.senha},"pao")
      newUser.auth = token

      const response  = await userRepository.save(newUser)
      if(response){
        return response
      }
    }catch(error){
     console.log(error)
    }
  }

  public async loginUser(userEmail:string, userSenha:string){
    try{
      const findUser = await userRepository.find({ select:['idusuario','senha'],where:{
        email : userEmail
      }})

      if(!findUser.length){
        return console.log("usuario não foi encontrado, email ou senha inválido ")
      }
      const senha_hash = findUser
      const senha_desc = CryptoJS.AES.decrypt(senha_hash,'chavessecreta',{
        format: 'hex',
      })

      if(!senha_desc) {
        return console.log("falha ao desencriptar a senha ")
      }

      const token =  jwt.sign({id:userId},'pao')
      
      return token

    }catch(error){
      console.log(error)
    }
  }
}