import { Response,Request,NextFunction } from "express";
import * as jwt from 'jsonwebtoken'


export async function VerifyToken(req: Request,res: Response,next:NextFunction){

  const bearerReq = req.headers['authorization']
  const bearer = bearerReq?.split(' ')
  const bearerToken = bearer && bearer.length > 1 && bearer[1]

  try{

  const token = await jwt.verify(bearerToken || '', 'pao') as any
  (req as  any).authUser = {id:token.id}
  
  if(token){
    next()
    return;
  }else{
    return res.status(400).send({erro:'Usuário inválido'})
  }
  }catch(err){
    console.log(err)
    return res.status(400).send({error:"Erro em verificar o  token "})
  }


}