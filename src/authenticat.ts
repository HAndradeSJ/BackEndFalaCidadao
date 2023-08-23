import { DataSource } from "typeorm"
import { User } from "./models/user"


export const conectedDatabase = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "dweb3",
    entities: [
      User
  ],
  synchronize: true,
  logging: true,
  
})