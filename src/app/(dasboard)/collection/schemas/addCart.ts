import { z } from 'zod'

export const cartDataFormSchema = z
  .object({
    model: z.string({ required_error: 'Modelo é obrigatório' }),
    year: z.string().optional(),
    purchaseDate: z.string().optional(),
    image: z.string().optional(),
    isFavorite: z.boolean().optional()
  })
  .partial({ year: true, purchaseDate: true, image: true, isFavorite: true })
  .required({ model: true })

export type CartDataForm = z.infer<typeof cartDataFormSchema>
