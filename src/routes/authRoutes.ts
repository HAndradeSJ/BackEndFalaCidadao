import { Router } from "express"
import { UserController } from "../controllers/userControllers";


const authRouter = Router()

//Routes
authRouter.post('/sing-up',UserController.Instance().singUpUser)
authRouter.get('/login',UserController.Instance().loginUser)

export default {authRouter};