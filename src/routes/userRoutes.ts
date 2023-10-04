import { Router } from "express"
import { UserController } from "../controllers/userControllers";
import { uploadAvatar } from "../config/multer";


const userRouter = Router()

//Routes
userRouter.put('/edit',UserController.Instance().changePassword)
userRouter.get('/getall',UserController.Instance().getAllUsers)
userRouter.get('/getone',UserController.Instance().getbyId)
userRouter.put('/senha/rest',UserController.Instance().resetPassword)
userRouter.put('/foto/uplaod',uploadAvatar.single('file'),UserController.Instance().uploadPhoto)

export default {userRouter};