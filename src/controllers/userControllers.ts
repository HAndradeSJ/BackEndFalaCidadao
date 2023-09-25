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
      if(!email){
        return res.status(404).send({err:"Não passou o email"})
      }
      else if(!senha){
        return res.status(404).send({err:"Não passou a senha "})
      }
      const authenticated = await UserServices.Instance().loginUser(email,senha)
      return res.status(200).send({token: authenticated})

    }catch(err){
      res.status(500).send(err)
      console.log(`ocorreu  um erro no controllers de singUp ${err}`)
    }
  }

  public async changePassword(req: Request, res: Response){
    try{
        const newData = req.body
        const {id}  = (req as any).authUser
        if(!newData){
          return res.status(400).send({response:'Dado  não foi passada '})
        }
        const change = await UserServices.Instance().changePassword(newData,id)
        return res.status(200).send({response:change})
    }catch(err){
       return res.status(500).send({response:"Ocorreu um erro ao atualizar sennha "})
    }
  }
  public async resetPassword(req: Request, res: Response){
    try{
          const {email} = req.body
        if(!email){
          return res.status(400).send({response:'Email não foi passado'})
        }
        const change = await UserServices.Instance().resetPassword(email)
        return res.status(200).send({response:change})
    }catch(err){
       return res.status(500).send({response:"Ocorreu um erro ao resetar a  sennha "})
    }
  }


  public async getAllUsers(req: Request, res: Response) {
    try{
      const getUsers = await UserServices.Instance().selectAll()
      return res.status(200).send({response:getUsers})

    }catch(err){
      console.log(err)
      return res.status(500).send({error:"Erro ao pegar todos os Usuários"})
    }
  }
  
  public async getbyId(req: Request, res: Response) {
    try{
      const {id} = req.params
      console.log(id)
      const getUsers = await UserServices.Instance().selectbyId(id)
      return res.status(200).send({response:getUsers})

    }catch(err){
      console.log(err)
      return res.status(500).send({error:"Erro ao pegar o Usuários"})
    }
  }
}