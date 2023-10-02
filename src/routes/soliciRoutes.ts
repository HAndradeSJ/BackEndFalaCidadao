import { Router } from "express";
import { SolicitacaoController } from "../controllers/solicitacaoControllers";
import { uploadSolici } from "../config/multer";


const soliciRouter = Router()

soliciRouter.post('/create',SolicitacaoController.Instance().SolicitacaoCreate)
soliciRouter.put('/upload/image',uploadSolici.single('file'),SolicitacaoController.Instance().SolicitacaoUpload)
soliciRouter.get('/getall',SolicitacaoController.Instance().getAllsolicitacao)


export default {soliciRouter}