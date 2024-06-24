export type AddCartInput = {
  userEmail: string
  model: string
  value?: string
  year?: number
  purchaseDate?: Date
  image?: Express.Multer.File
  isFavorite?: boolean
  comments?: string
}
