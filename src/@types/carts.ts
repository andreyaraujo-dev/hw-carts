export type Cart = {
  _id: string
  imageUrl?: string
  model: string
  year?: number
  collection?: string
  value?: number
  purchaseDate?: Date
  isFavorite: boolean
  createdAt: Date
  updatedAt?: Date
  comments?: string
}
