
import http from 'http';
import app from './config';
import { conectedDatabase } from './authenticat';
const server = http.createServer({},app)

 const port= 3080
server.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
  conectedDatabase.initialize().then(() => {
    console.log('Database initialized successfully')
  }).catch((err) => {
    console.log('Error in initializing database'+ err)
  });
})