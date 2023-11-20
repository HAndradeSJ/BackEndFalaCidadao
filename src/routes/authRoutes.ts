import { Router } from "express"
import { UserController } from "../controllers/userControllers";
import { userSchema } from "../dto/userDto";
import  {Validate}  from "../config/validate";



const authRouter = Router()
const google_login = Router();

//Routes
authRouter.post('/sign-up',UserController.Instance().singUpUser,)
google_login.post('/login/google',UserController.Instance().loginGoogle)
authRouter.post('/login',UserController.Instance().loginUser)

export default {authRouter}; 