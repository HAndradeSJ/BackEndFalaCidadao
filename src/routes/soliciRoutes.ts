import { Router } from "express";
import { SolicitacaoController } from "../controllers/solicitacaoControllers";
import { uploadSolici } from "../config/multer";


const soliciRouter = Router()

soliciRouter.post('/create',SolicitacaoController.Instance().SolicitacaoCreate)
soliciRouter.post('/upload/image',uploadSolici.single('file'),SolicitacaoController.Instance().SolicitacaoUpload)
soliciRouter.get('/getall/cidadao',SolicitacaoController.Instance().getAllsolicitacao)
soliciRouter.get('/getbychamado',SolicitacaoController.Instance().getByChamado)
soliciRouter.get('/getbysecretaria',SolicitacaoController.Instance().getByChamado)
soliciRouter.get('/getall/agente',SolicitacaoController.Instance().getSolicitacaoAgente)
soliciRouter.put('/emandamento/solicitacao',SolicitacaoController.Instance().AndamentoSolicitacao)
soliciRouter.put('/encerrar/solicitacao',SolicitacaoController.Instance().EncerramentoSolicitacao)
soliciRouter.put('/recusar/solicitacao',SolicitacaoController.Instance().RecusarSolicitacao)
soliciRouter.get('/get/mysolici',SolicitacaoController.Instance().getMySolicitacao)
soliciRouter.delete('/delete/:id',SolicitacaoController.Instance().deleteSolicitacao)



export default {soliciRouter}




