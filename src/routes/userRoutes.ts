import { Router } from "express"
import { UserController } from "../controllers/userControllers";


const userRouter = Router()

//Routes
userRouter.put('/edit',UserController.Instance().changePassword)
userRouter.get('/getall',UserController.Instance().getAllUsers)
userRouter.get('/get/:id',UserController.Instance().getbyId)
userRouter.put('/senha/rest',UserController.Instance().resetPassword)
userRouter.put('/foto/uplaod',UserController.Instance().uploadPhoto)

export default {userRouter};