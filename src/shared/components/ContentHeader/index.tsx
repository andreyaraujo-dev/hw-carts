import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../ui/breadcrumb'

interface ContentHeaderProps {
  title: string
  currentPath: string
  previousPath: string
  previousLink: string
}

export function ContentHeader({
  title,
  currentPath,
  previousPath,
  previousLink
}: ContentHeaderProps) {
  return (
    <div className="w-full mb-4">
      <span>
        <h1 className="font-bold text-3xl mb-3">{title}</h1>
      </span>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={previousLink}>{previousPath}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPath}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
