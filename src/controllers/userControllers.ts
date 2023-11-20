import { Response,Request } from "express"
import { UserServices } from "../services/userServices"
import { userRepository } from "../repostitory/userRepository"
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
      const file = req.file
      console.log(file)
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
      return res.status(200).send({response: authenticated})

    }catch(err){
      res.status(500).send(err)
      console.log(`ocorreu  um erro no controllers de singUp ${err}`)
    }
  }

  public async loginGoogle(req: Request, res: Response){
    try{
      const authenticated = await UserServices.Instance().loginGoogle(req,res)
      return res.status(200).send({response: authenticated})

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
      const {id}  = (req as any).authUser
      const getUsers = await UserServices.Instance().selectbyId(id)
      return res.status(200).send({response:getUsers})

    }catch(err){
      console.log(err)
      return res.status(500).send({error:"Erro ao pegar o Usuários"})
    }
  }
  public async uploadPhoto(req: Request, res: Response){
    try{
       const file =  req.file
       const {id}  = (req as any).authUser

       console.log(file)
       if(!file){
        return res.status(404).send({error:"arquivo não foi possível"})
       }

       const savephoto =  await UserServices.Instance().uploadPhoto(id,file)
       console.log(savephoto)
       return res.status(200).send({response:"imagme registrada com sucesso !"})

    }catch(err){
      console.log(err)
      return res.status(500).send({error:"erro upload de photos"})
    }
  }
  public async deleteUser(req: Request, res: Response){
    try{
      const {id}  = (req as any).authUser
      const idParms  = req.params.id 
      if(!idParms){

        const responsetoken = await UserServices.Instance().deleteById(id)
        return res.status(200).send({response: responsetoken})

      }
      const responseParams= await UserServices.Instance().deleteById(idParms)
      return res.status(200).send({response: responseParams})
      
    }catch(err){
      console.log(err)
      return res.status(500).send({error:"erro ao deletar Usários"})
    }
  }
}