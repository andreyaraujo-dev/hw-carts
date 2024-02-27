export type UpdateCartInput = {
  _id: string
  userEmail: string
  model: string
  value?: string
  year?: number
  purchaseDate?: Date
  imageUrl?: string
  isFavorite?: boolean
}
