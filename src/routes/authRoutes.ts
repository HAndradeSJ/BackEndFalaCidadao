import { Router } from "express"
import { UserController } from "../controllers/userControllers";
import { upload } from "../config/multer";


const authRouter = Router()

//Routes
authRouter.post('/sign-up',UserController.Instance().singUpUser)
authRouter.post('/login',UserController.Instance().loginUser)

export default {authRouter};