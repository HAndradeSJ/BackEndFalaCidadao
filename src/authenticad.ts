import env from 'dotenv'

import { DataSource } from "typeorm"
import {  Usuarios } from "./models/userModels"
import { Solicitacao } from "./models/solicitacaoModels"

env.config({path:__dirname + './.env'})

export const conectedDatabase = new DataSource({
    type: "mysql",
    host:"localhost",
    port: 3306,
    username:"root",
    password:"1234",
    database:"falacidadao",
    entities: [
      Usuarios,
      Solicitacao
  ],
  synchronize: true,
  logging: true,
  
})