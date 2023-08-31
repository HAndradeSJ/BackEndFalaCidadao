import { DataSource } from "typeorm"
import {  Usuarios } from "./models/userModels"
import env from 'dotenv'

env.config({path:__dirname + './.env'})

export const conectedDatabase = new DataSource({
    type: "mysql",
    host:process.env.localhost,
    port: 3306,
    username:process.env.username,
    password:process.env.password,
    database:process.env.database,
    entities: [
      Usuarios
  ],
  synchronize: true,
  logging: true,
  
})