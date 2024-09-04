export type CartResponse = {
  _id: string
  imageURL?: string
  model: string
  collection?: string
  year?: number
  value?: number
  purchaseDate?: Date
  isFavorite: boolean
  createdAt: Date
  updatedAt?: Date
  comments?: string
}
