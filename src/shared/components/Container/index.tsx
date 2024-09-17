interface ContainerProps {
  children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="flex w-full h-full p-6 flex-col space-y-5">{children}</div>
  )
}
