import { conectedDatabase } from './authenticad'
import app from './config'

import http from 'http'

const server = http.createServer({},app)
const port = 3080


server.listen(port,()=>{
console.log(`server listening on port ${port}`)
conectedDatabase.initialize().then(()=>{
  console.log(`Database initialized successfully`)
}).catch((err)=>{
  console.log(`Error in initializing database ${err}`)
})
})