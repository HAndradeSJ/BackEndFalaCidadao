import {v4} from 'uuid'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import jwt from 'jsonwebtoken'


import { Usuarios } from '../models/userModels';
import { userDto } from '../dto/userDto';
import { userRepository } from '../repostitory/userRepository';
import { OAuth2Client } from 'google-auth-library';

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
      console.log('oi')
      const findEmail = await userRepository.findOneBy({email:valid.email})
      
      if(findEmail?.email== valid.email){
        return {error:"Email já cadastrado "}
      }
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
      var funcao = ''
      const hashDigest = sha256(userSenha)
      const senhaHash = Base64.stringify(hmacSHA512(hashDigest,'chavesecreta'))
      const findEmail = await userRepository.findOneBy({
        email: userEmail,
      })
      const findPassword = await userRepository.findOneBy({
        senha: senhaHash
      })
      if(findEmail == null){
        return{erro:"Email inválido"}
      }
      if(findPassword == null){
        return {erro:"Senha inválida"}
      }

      const findUser = await userRepository.findOneBy({
        email: userEmail,
        senha: senhaHash
      })
      if(findUser?.funcao == 'cidadao'){
        funcao = 'cidadao'
      }
      else{
        funcao ='agente'
      }

      if(findUser){
        const token = jwt.sign({email:findUser.email,senha:findUser.senha,id:findUser.idusuario},'pao')
        const user = {
          token:token,
          funcao : funcao
        }
        console.log(user)
        return user
      }
      else{
        return {erro:"Conta inexistente"}
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
     
      }

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

  public async  loginGoogle(req:any, res:any){
    try{
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience:"792842872794-9j1lbeb0na81q1i974p1kec8eemrt12h.apps.googleusercontent.com",
 
    });
    const payload = ticket.getPayload();
    const googleId = payload?.sub;
    const ImageUrl = payload?.picture;
    const email = payload?.email;
    if(!email) {
      res.status(401).send("Conta do Google não existe");
      return;
  }
  const foundUser = await userRepository.findOneBy({ email });
  if (foundUser) {
    foundUser.auth = req.body.fcmToken;
    foundUser.idGoogle = googleId || '';
    foundUser.avatarUrl =  ImageUrl || '';
    await userRepository.save(foundUser);
     }
     if(foundUser == null){
      res.status(401).send("Usúario não existe");
      return;
     }
    
      var funcao =''
      if(foundUser?.funcao == 'cidadao'){
        funcao = 'cidadao'
      }
      else{
        funcao ='agente'
      }
      
      if(foundUser){
        const token = jwt.sign({email:foundUser.email,senha:foundUser.senha,id:foundUser.idusuario},'pao')
        const user = {
          token:token,
          funcao : funcao
        }
        console.log(user)
        return user
      }
      else{
        return {erro:"Conta inexistente"}
      }
        
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel logar "}
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
      console.log(id)
      const one = await userRepository.findOneBy({idusuario:id})
      console.log(one)
      if(one){

        return one

      }else{
        return 'Usuario não foi encontrado'
      }
    }catch(error){
      console.log(error)
      return {error:"Não foi pegar todos Usuarios"}
    }

  }

  public async uploadPhoto(id:string,upload:any){
    try{
      const finduser = await userRepository.findOneBy({idusuario : id})
      if(finduser){
        console.log(finduser)
        const newUser = new Usuarios()
        newUser.avatarUrl = upload.path
        
        const uploadImage = await userRepository.update(id,newUser)

        if(uploadImage){
          return {response:"Imagem salva com sucesso !"}
        }
        else{
          return {erro:"occoreu um erro ao salvar no upload "}
        }

      }else{
        return 'Usuario não foi encontrado'
      }
    }catch(error){
      console.log(error)
      return {error:"Não foi pegar todos Usuarios"}
    }
  }

  
  public async deleteById(id:string){
    try{
      const response =  await userRepository.delete(id)
      if (response.affected == 0 ){
        return {error:"Esse Usuário já foi deletado"}
      }
      return {sucess:"Usuário deletado com sucesso !"}
    
    }catch(error){
      console.log(error)
      return {error:"Não foi possivel deletar essa conta "}
    }
  }

}