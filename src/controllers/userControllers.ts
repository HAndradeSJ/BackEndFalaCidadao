import { Request, Response, NextFunction, request } from 'express'
import { UserService } from '../services/userServices'

export class UserController {
  private static instance: UserController
  private constructor() {}

  public static Instance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController()
    }
    return UserController.instance
  }

   public async  singUp(req: Request, res: Response){
    try{
      const dataUser = req.body
      if(!dataUser){
        return res.status(404).send(`not all data in user `)
      }
      const saveUser = await UserService.Instance().singUpUser(dataUser)
      res.send(`User saved successfully  ${JSON.stringify(saveUser)}`)

    }catch(err){
      res.status(500).send(err)
      console.log(` problem in controller not possible to sing up ${err}`)
    }


   }
   public async login(req: Request, res: Response){
      try{
          const {email,password} = req.body
          if(!email||!password){
            return res.status(404).send(`not all data in user `)
          }
          const loginUser = await UserService.Instance().loginUser(email,password)
          res.send(`User logged in successfully ${JSON.stringify(loginUser)}`)
      }catch(err){
        res.status(500).send(`User not logged ${err}`)
        console.log(` problem in controller not possible to login user ${err}`)
      }
   }
     

  }
  
  
