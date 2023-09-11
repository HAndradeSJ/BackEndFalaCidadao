import { conectedDatabase } from "../authenticad";
import { Solicitacao } from "../models/solicitacaoModels";


export const SolicitacaoRepository = conectedDatabase.getRepository(Solicitacao)