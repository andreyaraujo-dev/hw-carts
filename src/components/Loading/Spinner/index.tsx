import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const spinnerVariants = cva(
  'animate-spin animate-infinite animate-ease-in-out h-6 w-6 rounded-full border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-gray-400'
)

interface SpinnerProps {
  className?: VariantProps<typeof spinnerVariants>
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div className={cn(spinnerVariants({ className }))} />
    </div>
  )
}
