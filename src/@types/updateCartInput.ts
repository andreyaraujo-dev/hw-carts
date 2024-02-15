export type UpdateCartInput = {
  _id: string
  userEmail: string
  model: string
  value?: number
  year?: number
  purchaseDate?: Date
  imageUrl?: string
  isFavorite?: boolean
}
