import {Request,Response,NextFunction} from 'express'
import {z,AnyZodObject} from 'zod'

export const Validate = (schema:AnyZodObject)=>{
  async(req:Request, res:Response,next:NextFunction)=>{
    try{
      schema.parse(req.body);
      next()
    }catch(err){
      return res.status(400).json(err)
    }
  }
}
