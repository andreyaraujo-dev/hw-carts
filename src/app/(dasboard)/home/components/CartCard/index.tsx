import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface CartCardProps {
  imageURL: string
  model: string
  year: number
  purchaseDate: string
  isFavorite?: boolean
}

export function CartCard({
  imageURL,
  model,
  purchaseDate,
  year,
  isFavorite
}: CartCardProps) {
  return (
    <Card className="w-96 hover:cursor-pointer hover:bg-slate-900 transition-all m-2">
      <CardContent className="flex p-0 w-full">
        <div
          className="w-2/5 h-auto bg-no-repeat bg-cover bg-center rounded-l-md"
          style={{
            backgroundImage: `url("${imageURL}")`
          }}
        />

        <section className="flex flex-col justify-start p-3 flex-1">
          {isFavorite && (
            <div className="w-full flex justify-end">
              <Star size={12} className="text-yellow-500" />
            </div>
          )}
          <p>
            <strong>Modelo: </strong>
            {model}
          </p>
          <p>
            <strong>Ano: </strong>
            {year}
          </p>
          <p>
            <strong>Compra: </strong>
            {purchaseDate}
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
