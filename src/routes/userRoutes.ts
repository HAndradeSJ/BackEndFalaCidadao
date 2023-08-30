import { Router } from "express"
import { UserController } from "../controllers/userControllers";


const userRouter = Router()

//Routes
userRouter.post('/sing-up',UserController.Instance().singUp)

export default {userRouter};