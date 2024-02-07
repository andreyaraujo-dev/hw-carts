import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const inputVariants = cva(
  'p-2 text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border border-input',
        outline: 'border border-input',
        error: 'border border-red-error bg-background focus:border-red-600'
      },
      size: {
        default: 'w-full h-12 px-8 mt-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type InputPropsWithoutSize = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
>

export interface InputProps
  extends InputPropsWithoutSize,
    VariantProps<typeof inputVariants> {
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, errorMessage, ...props }, ref) => {
    return (
      <div className="mb-4 w-full">
        <input
          type={type}
          className={cn(inputVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="block font-bold text-base p-2 text-red-error">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
