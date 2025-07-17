import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ListViewProps {
  children: ReactNode
  className?: string
}

export function ListView({ children, className }: ListViewProps) {
  return (
    <div className={cn(
      'space-y-4 animate-fade-in',
      className
    )}>
      {children}
    </div>
  )
}