import { z } from 'zod'

export interface secretariaDto {
  idsecretaria:string
  nome: string
  responsavel: string
  telefone: number
  descricao: string
  fk_idusuario: string
 
 
}

export const secretariaSchema = z.object({
  idsecretaria: z.string(),
  nome: z.string().min(10),
  responsavel: z.string().min(10),
  telefone: z.number().min(5),
  descricao: z.string().min(10),
  fk_idusuario:z.string(),

  
})

export const userid = z.object({
  idusuario: z.string()
})