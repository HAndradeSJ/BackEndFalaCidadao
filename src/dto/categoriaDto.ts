import { z } from 'zod'

export interface categoriaDto {
  idcategoria:string
  categoria: string
  fk_idsecretaria : string
 
}

export const categoriaSchema = z.object({
  idcateogoria: z.string(),
  categoria: z.string().min(10),
  fk_idsecretaria: z.string().min(0),
  
})

export const userid = z.object({
  idusuario: z.string()
})