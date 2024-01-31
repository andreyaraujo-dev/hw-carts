import { CartCard } from './components/CartCard'

export default function Home() {
  const imageURL =
    'https://i.pinimg.com/originals/ac/34/84/ac348422c1fd4d46f9a652f32839f8d6.jpg'
  return (
    <div className="flex w-full h-full p-6 flex-col space-y-3">
      <div className="w-full">
        <h2 className="font-bold text-2xl mb-3">Favoritos</h2>
        <div className="flex items-center space-x-3 w-full flex-wrap">
          <CartCard
            imageURL={imageURL}
            model="Mustang"
            purchaseDate="20/07/2023"
            year={1980}
            isFavorite
          />
        </div>
      </div>

      <div className="w-full">
        <h2 className="font-bold text-2xl mb-3">Coleção</h2>
        <div className="flex items-center w-full flex-wrap">
          <CartCard
            imageURL={imageURL}
            model="Mustang"
            purchaseDate="20/07/2023"
            year={1980}
          />

          <CartCard
            imageURL={imageURL}
            model="Mustang"
            purchaseDate="20/07/2023"
            year={1980}
          />
        </div>
      </div>
    </div>
  )
}
