import { Home, Map, Calendar, Settings, Compass, TrendingUp, Users, Bookmark, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface FuturisticSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

const navigation = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: Home, 
    badge: null,
    description: 'Overview & stats'
  },
  { 
    id: 'trips', 
    label: 'My Trips', 
    icon: Calendar, 
    badge: '3',
    description: 'Manage your journeys'
  },
  { 
    id: 'discover', 
    label: 'Discover', 
    icon: Compass, 
    badge: 'New',
    description: 'Find new destinations'
  },
  { 
    id: 'map', 
    label: 'Map View', 
    icon: Map, 
    badge: null,
    description: 'Interactive exploration'
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: TrendingUp, 
    badge: null,
    description: 'Travel insights'
  },
  { 
    id: 'social', 
    label: 'Social', 
    icon: Users, 
    badge: '12',
    description: 'Connect with travelers'
  },
  { 
    id: 'bookmarks', 
    label: 'Saved', 
    icon: Bookmark, 
    badge: null,
    description: 'Your saved places'
  },
]

const quickActions = [
  { id: 'ai-planner', label: 'AI Trip Planner', icon: Zap, color: 'from-purple-500 to-pink-500' },
  { id: 'weather', label: 'Weather Forecast', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
]

export function FuturisticSidebar({ activeTab, onTabChange, className }: FuturisticSidebarProps) {
  return (
    <aside className={cn('w-64 glass-effect border-r border-primary/20 backdrop-blur-xl', className)}>
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      'w-full justify-start h-auto p-3 transition-all duration-200 group',
                      isActive 
                        ? 'gradient-primary text-white shadow-lg glow-primary' 
                        : 'hover:bg-primary/10 hover:border-primary/20'
                    )}
                    onClick={() => onTabChange(item.id)}
                  >
                    <div className="flex items-center w-full">
                      <Icon className={cn(
                        'h-5 w-5 mr-3 transition-transform group-hover:scale-110',
                        isActive ? 'text-white' : 'text-muted-foreground'
                      )} />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            'font-medium',
                            isActive ? 'text-white' : 'text-foreground'
                          )}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <Badge 
                              variant={isActive ? 'secondary' : 'outline'}
                              className={cn(
                                'text-xs',
                                isActive 
                                  ? 'bg-white/20 text-white border-white/30' 
                                  : 'bg-primary/10 text-primary border-primary/20'
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className={cn(
                          'text-xs mt-1',
                          isActive ? 'text-white/70' : 'text-muted-foreground'
                        )}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="w-full justify-start p-3 hover:bg-primary/10 group"
                    onClick={() => console.log(`Quick action: ${action.id}`)}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} mr-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-primary/20">
          {/* Storage Usage */}
          <div className="mb-4 p-3 rounded-lg glass-effect border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-xs text-muted-foreground">2.1GB / 5GB</span>
            </div>
            <Progress value={42} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Photos and maps
            </p>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-primary/10"
            onClick={() => onTabChange('settings')}
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>
    </aside>
  )
}