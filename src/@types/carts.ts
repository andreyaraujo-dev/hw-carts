export type Cart = {
  _id: string
  imageUrl?: string
  model: string
  year?: number
  value?: string
  purchaseDate?: Date
  isFavorite: boolean
  createdAt: Date
  updatedAt?: Date
  comments?: string
}
