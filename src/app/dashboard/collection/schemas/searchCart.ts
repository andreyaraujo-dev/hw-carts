import { z } from 'zod'

export const searchCartSchema = z.object({
  model: z.string().min(1, { message: 'Modelo do carro é obrigatório' })
})

export type SearchCart = z.infer<typeof searchCartSchema>
