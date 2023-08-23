import {v4} from 'uuid'
import {userDto} from '../dto/userDto'
import { User } from '../models/user'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { userRepository } from '../repostitory/userRepostitory';

export class UserService{
  private static instance: UserService
  private constructor() {}

  public static Instance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

   public async singUpUser(valid: userDto): Promise<User> {
    try{
      const newUser = new User()
      newUser.id = v4()
      newUser.name = valid.name
      newUser.email = valid.email
      const hashDigest = sha256(newUser.password);
      console.log('hashDigest', hashDigest)
      const hmacDigest = Base64.stringify(hmacSHA512(hashDigest,"chaveSecreta"));
      console.log('hmacDigest', hmacDigest)
      newUser.password = hmacDigest

      const response = await userRepository.save(newUser)
      return Promise.resolve(response)


    }catch (err) {
      return Promise.reject(new Error(`Erro creating user in server: ${err}`))
    }
  }
  public async loginUser(email:string, password:string): Promise<User>{
    try{
        const findUser =  await userRepository.findOneBy({
          email:email,
          password:password
        })
        if(findUser){
          return Promise.resolve(findUser)
        }else{
          return Promise.reject(new Error(`User not registered `))
        }
    }catch(err){
      return Promise.reject(new Error(`Erro in singUp user  ${err}`))
    }
  }
  
  
}