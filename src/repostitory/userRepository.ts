import { conectedDatabase } from "../authenticad";
import { Usuarios } from "../models/userModels";


export const userRepository = conectedDatabase.getRepository(Usuarios)