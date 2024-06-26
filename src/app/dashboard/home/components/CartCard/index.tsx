import { Card, CardContent } from '@/components/ui/card'
import { ImageOff, Star } from 'lucide-react'

interface CartCardProps {
  imageURL?: string
  model: string
  year?: number
  purchaseDate?: string
  isFavorite?: boolean
}

export function CartCard({
  imageURL,
  model,
  purchaseDate = 'Não informado',
  year,
  isFavorite
}: CartCardProps) {
  return (
    <Card className="w-60 h-72 p-2 hover:cursor-pointer hover:bg-zinc-900 transition-all">
      <CardContent className="flex flex-col justify-between p-0 w-full h-full">
        {imageURL ? (
          <div
            className="w-full h-3/5 bg-no-repeat bg-contain bg-center rounded-l-md"
            style={{
              backgroundImage: `url("${imageURL}")`
            }}
          />
        ) : (
          <section className="flex items-center justify-center w-full h-2/5">
            <ImageOff size={90} className="text-zinc-500" />
          </section>
        )}

        <section className="flex flex-col justify-start p-2">
          {isFavorite && (
            <div className="w-full flex justify-end">
              <Star size={12} className="text-yellow-500" />
            </div>
          )}
          <p className="text-sm">
            <strong>Modelo: </strong>
            <span className="text-gray-400 font-medium">{model}</span>
          </p>
          <p className="text-sm">
            <strong>Ano: </strong>
            <span className="text-gray-400 font-medium">
              {year || 'Não informado'}
            </span>
          </p>
          <p className="text-sm">
            <strong>Compra: </strong>
            <span className="text-gray-400 font-medium">{purchaseDate}</span>
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
