import { z } from 'zod'

export interface userDto {
  idusuario:string
  nome: string
  idade: number
  cpf: string
  telefone : string
  funcao : string
  email : string
  senha : string
  idagente : string
}

export const requestSchema = z.object({
  nome: z.string().min(100),
  idade: z.number().max(2),
  cpf: z.string().min(15).max(15),
  telefone : z.string().min(14).max(14),
  funcao: z.string().max(15),
  email: z.coerce.string().min(100),
  senha: z.coerce.string().min(4).max(100),
})

export const userid = z.object({
  idusuario: z.string()
})