import { z } from 'zod'

export interface SolicitacaoDto {
  idsolicitacao:string
  protocolo:number
  data_abertura:string
  data_encerramento:string
  fk_idusuario : string
  fk_idagente : string
  status: string
  imagemUrl: string
  descricao:string
  logradouro: string
  numero: number
  bairro: string
  justifictiva: string
  pontoderef: string
  comentario: string
  fk_idcategoria:string
}

export const soliSchema = z.object({
  status: z.string().min(3),
  protocolo: z.string(),
  data_abertura: z.string().min(1),
  data_encerramento: z.string().min(1),
  imageUrl: z.string().min(7),
  descricao: z.string().min(6).max(255),
  logadouro: z.string().min(6).max(255),
  numero: z.number().min(6).max(100),
  bairro: z.string().max(50),
  justificativa: z.string().max(255),
  pontoref: z.string().min(4).max(100),
  confirmacao: z.string().max(200),
  comentario: z.string().max(250),
  fk_categoria: z.string().max(300),
  fk_idusuario :z.string().max(300),
  fk_idagente : z.string().max(300)

})

export const solicitacaoId = z.object({
  idsolicitacao: z.string()
})