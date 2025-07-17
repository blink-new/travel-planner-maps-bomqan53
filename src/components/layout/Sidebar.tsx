import { Home, Map, Calendar, Settings, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'trips', label: 'My Trips', icon: Calendar },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'map', label: 'Map View', icon: Map },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange, className }: SidebarProps) {
  return (
    <aside className={cn('w-64 border-r bg-muted/10', className)}>
      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'}
              className="justify-start"
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}