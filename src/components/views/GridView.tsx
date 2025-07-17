import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GridViewProps {
  children: ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4
}

export function GridView({ children, className, columns = 3 }: GridViewProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={cn(
      'grid gap-6 animate-fade-in',
      gridCols[columns],
      className
    )}>
      {children}
    </div>
  )
}