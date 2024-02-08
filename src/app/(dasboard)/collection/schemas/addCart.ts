import { z } from 'zod'

export const cartDataFormSchema = z
  .object({
    model: z
      .string({ required_error: 'Modelo é obrigatório' })
      .min(1, { message: 'O modelo é obrigatório' }),
    value: z.number().optional(),
    year: z.number().optional(),
    purchaseDate: z.coerce.date().optional(),
    imageUrl: z.string().optional(),
    isFavorite: z.boolean().optional().default(false)
  })
  .required({ model: true })

export type CartDataForm = z.infer<typeof cartDataFormSchema>
