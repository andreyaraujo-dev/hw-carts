export type CartResponse = {
  _id: string
  imageURL?: string
  model: string
  year?: number
  value?: number
  purchaseDate?: Date
  isFavorite: boolean
  createdAt: Date
  updatedAt?: Date
}
