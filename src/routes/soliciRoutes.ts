import { Router } from "express";
import { SolicitacaoController } from "../controllers/solicitacaoControllers";


const soliciRouter = Router()

soliciRouter.post('/create',SolicitacaoController.Instance().SolicitacaoCreate)


export default {soliciRouter}