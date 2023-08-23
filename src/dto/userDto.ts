import { z } from 'zod'

export interface userDto {
  id:string
  name: string
  email: string
  password: string
}

export const requestSchema = z.object({
  name: z.string().min(15),
  email: z.coerce.string().min(15),
  password: z.coerce.string().min(4),
  request: z.string().optional(),
  adress: z.string().min(10),
})

export const userid = z.object({
  id: z.string()
})