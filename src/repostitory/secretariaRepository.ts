import { conectedDatabase } from "../authenticad";
import { Secretaria } from "../models/secretariaModels";



export const SecretariaRepository = conectedDatabase.getRepository(Secretaria)