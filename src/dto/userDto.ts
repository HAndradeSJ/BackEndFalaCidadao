import { z } from 'zod'

export interface userDto {
  idusuario:string
  nome: string
  idade: number
  cpf: string
  funcao : string
  email : string
  senha : string
  idagente : string
}

export const requestSchema = z.object({
  nome: z.string().min(100),
  idade: z.string().min(2),
  cpf: z.string().min(15).max(15),
  funcao: z.string().max(15),
  email: z.coerce.string().min(100),
  senha: z.coerce.string().min(4).max(100),
})

export const userid = z.object({
  idusuario: z.string()
})