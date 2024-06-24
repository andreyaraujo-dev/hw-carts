import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

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
    image: z
      .any()
      .optional()
      // To not allow files other than images
      .refine(
        (file) => {
          if (file) {
            return ACCEPTED_IMAGE_TYPES.includes(file?.type as string)
          }

          return true
        },
        {
          message: 'Apenas arquivos .jpg, .jpeg, .png e .webp são aceitos.'
        }
      )
      // To not allow files larger than 5MB
      .refine(
        (file) => {
          if (file) {
            return (file?.size as number) <= MAX_FILE_SIZE
          }

          return true
        },
        {
          message: `Tamanho máximo do arquivo é 5MB.`
        }
      ),
    isFavorite: z.boolean().optional().default(false),
    // .transform((value) => value === 'true'),
    comments: z.string().optional()
  })
  .required({ model: true })

export type CartDataForm = z.infer<typeof cartDataFormSchema>
