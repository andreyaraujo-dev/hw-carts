export type Cart = {
  _id: string
  imageURL?: string
  model: string
  year?: number
  value?: string
  purchaseDate?: Date
  isFavorite: boolean
  createdAt: Date
  updatedAt?: Date
}
