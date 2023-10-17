import { Router } from "express"
import { UserController } from "../controllers/userControllers";
import { userSchema } from "../dto/userDto";
import  {Validate}  from "../config/validate";



const authRouter = Router()

//Routes
authRouter.post('/sign-up',UserController.Instance().singUpUser,)
authRouter.post('/login',UserController.Instance().loginUser)

export default {authRouter}; 