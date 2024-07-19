export type UpdateCartInput = {
  _id: string
  userEmail: string
  model: string
  value?: number
  collection?: string
  year?: number
  purchaseDate?: Date
  image?: Express.Multer.File
  isFavorite?: boolean
  comments?: string
}
