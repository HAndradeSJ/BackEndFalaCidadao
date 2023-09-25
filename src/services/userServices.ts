import {v4} from 'uuid'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'


import { Usuarios } from '../models/userModels';
import { userDto } from '../dto/userDto';
import { userRepository } from '../repostitory/userRepository';
import emailTransportor from '../config/nodemiler';




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
        return {error:"Email ou senha, não foi registrada"}
      }
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel logar "}
    }
  }

  public async changePassword(dataEdit:any,id:string){
    try{
      const userEdit  = await userRepository.findOneBy({idusuario:id})
      const userChange = new Usuarios()
     if(userEdit){

      if(dataEdit.senha){
      const hashDigest = sha256(dataEdit.senha)
      const senhaHash = Base64.stringify(hmacSHA512(hashDigest,'chavesecreta'))
      userChange.senha = !senhaHash ? userEdit.senha = userChange.senha : senhaHash
      userChange.email = !dataEdit.email ? userEdit.email = userChange.email : dataEdit.email
      }

      userChange.email = !dataEdit.email ? userEdit.email = userChange.email : dataEdit.email
      const edit = await userRepository.update(id,userChange)

      if(edit){
        console.log(edit)
        return {response: 'Usuário editado com sucesso ! '}
      }
     }else{
      return {error:"Não foi possivel  encotrar esse Usuario	 "}
     }
    }catch(error){
      return {error:"Não foi possivel atualizar senha"}
    }
  }


  public async resetPassword(email : string){
    try{
      const searchUser = await userRepository.findOneBy({email});
      if(searchUser){
          const newUser = new Usuarios()
          const newPassword = searchUser.cpf.concat(searchUser.nome) 
          const hashDigest = sha256(newPassword)
          const senhaHash = Base64.stringify(hmacSHA512(hashDigest,'chavesecreta')) 
          newUser.senha = !senhaHash ? searchUser.senha : senhaHash

          const savePassword = await userRepository.update(searchUser.idusuario,newUser)

          if(savePassword){
            //  await emailTransportor.sendMail({
            //     from:'Henrique Andrade <henrique665@fiec.edu.br',
            //     to:"luisfernandopires305@gmail.com",
            //     subject:"senha resetada !",
            //     text:`<p>Sua senha nova é ${newPassword} </p>`
            //   })
                return `senha resetada com sucesso, sua nova senha ${newPassword}`
          }else{
            return {erro:"erro em atualizar senha !"}
          }
          
      }else{
        return {erro:"Email não encontrado !"}
      }
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel redefinir a senha "}
    }
  }
  

  public async selectAll(){
    try{
      const all = await userRepository.find()
      return all
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel pegar todos Usuarios"}
    }
  }
  

  public async selectbyId(id:string){
    try{
      const all = await userRepository.findOneBy({idusuario : id})
      if(all){

        return all

      }else{
        return 'Usuario não foi encontrado'
      }
    }catch(error){
      console.log(error)
      return {error:"Não foi pegar todos Usuarios"}
    }
  }

}