import { Router } from "express";
import { SolicitacaoController } from "../controllers/solicitacaoControllers";
import { uploadSolici } from "../config/multer";


const soliciRouter = Router()

soliciRouter.post('/create',SolicitacaoController.Instance().SolicitacaoCreate)
soliciRouter.put('/upload/image',uploadSolici.single('file'),SolicitacaoController.Instance().SolicitacaoUpload)
soliciRouter.get('/getall',SolicitacaoController.Instance().getAllsolicitacao)
soliciRouter.put('/encerrar/solicitacao',SolicitacaoController.Instance().EncerramentoSolicitacao)
soliciRouter.put('/recusar/solicitacao',SolicitacaoController.Instance().RecusarSolicitacao)
soliciRouter.get('/get/mysolici',SolicitacaoController.Instance().getMySolicitacao)
soliciRouter.delete('/delete/:id',SolicitacaoController.Instance().deleteSolicitacao)



export default {soliciRouter}




