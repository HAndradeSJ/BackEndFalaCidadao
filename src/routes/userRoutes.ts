import { Router } from "express"
import { UserController } from "../controllers/userControllers"

const userRouter = Router()

//Routes
userRouter.get('/login',UserController.Instance().login)
userRouter.post('/singup',UserController.Instance().singUp)

export default {userRouter};