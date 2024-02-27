import { z } from 'zod'

export const cartDataFormSchema = z
  .object({
    model: z
      .string({ required_error: 'O modelo do carro é obrigatório' })
      .min(1, { message: 'O modelo do carro é obrigatório' }),
    value: z
      .string()
      .transform((val) => {
        if (val !== '' || val !== undefined) {
          return parseFloat(val.replace('.', '').replace(',', '.')).toString()
        }
        return val
      })
      .optional(),
    year: z.number().optional(),
    purchaseDate: z.coerce.date().optional(),
    imageUrl: z.string().optional(),
    isFavorite: z.boolean().optional().default(false)
  })
  .required({ model: true })

export type CartDataForm = z.infer<typeof cartDataFormSchema>
