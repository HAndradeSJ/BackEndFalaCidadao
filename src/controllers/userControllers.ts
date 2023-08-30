import { Response,Request } from "express"
export class UserController {
  private static instance: UserController
  private constructor() {}

  public static Instance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController()
    }
    return UserController.instance
  }

  
  public async singUp(req:Request, res:Response){
    try{
      const dataUser = req.body
      if(!dataUser){
        return res.status(404).send(`ocorreu um erro nos dados do usuário`)
      }
      // const saveUser = await UserService.Instance().singUpUser(dataUser)
    // return  res.send(`User saved successfully  ${JSON.stringify(saveUser)}`)

    }catch(err){
      res.status(500).send(err)
      console.log(`ocorreu um erro no controllers de singUp ${err}`)
    }
  }
}