import { Response,Request } from "express"
import { UserServices } from "../services/userServices"
export class UserController {
  private static instance: UserController
  private constructor() {}

  public static Instance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController()
    }
    return UserController.instance
  }

  
  public async singUpUser(req:Request, res:Response){
    try{
      const dataUser = req.body
      if(!dataUser){
        return res.status(404).send({err:"ocorreu um erro nos dados do usuario"})
      }
      const saveUser = await UserServices.Instance().singUp(dataUser)
      return res.status(200).send({response: saveUser})

    }catch(err){
      res.status(500).send(err)
      console.log(`ocorreu um erro no controllers de singUp ${err}`)
    }
  }


  public async loginUser(req: Request, res: Response){
    try{
      const {email,senha} =req.body
      if(!email || !senha){
        return res.status(404).send({err:"ocorreu um erro nos dados do usuario"})
      }
      const authenticated = await UserServices.Instance().loginUser(email,senha)
      return res.status(200).send({token: authenticated})

    }catch(err){
      res.status(500).send(err)
      console.log(`ocorreu  um erro no controllers de singUp ${err}`)
    }
  }
}