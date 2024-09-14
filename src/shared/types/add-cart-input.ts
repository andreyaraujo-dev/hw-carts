export type AddCartInput = {
  userEmail: string
  model: string
  collection?: string
  value?: number
  year?: number
  purchaseDate?: Date
  image?: Express.Multer.File
  isFavorite?: boolean
  comments?: string
}
