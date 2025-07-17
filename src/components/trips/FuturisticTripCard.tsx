import { Calendar, MapPin, DollarSign, Users, Clock, Zap, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface Trip {
  id: string
  title: string
  description?: string
  startDate?: string
  endDate?: string
  budget?: number
  status: string
  destinationCount?: number
  image?: string
  progress?: number
  rating?: number
  isAiGenerated?: boolean
}

interface FuturisticTripCardProps {
  trip: Trip
  onClick: () => void
  viewMode?: 'grid' | 'list'
}

export function FuturisticTripCard({ trip, onClick, viewMode = 'grid' }: FuturisticTripCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'from-blue-500 to-cyan-500'
      case 'active':
        return 'from-green-500 to-emerald-500'
      case 'completed':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning':
        return 'Planning'
      case 'active':
        return 'Active'
      case 'completed':
        return 'Completed'
      default:
        return 'Draft'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'TBD'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatBudget = (budget?: number) => {
    if (!budget) return 'No budget set'
    return `$${budget.toLocaleString()}`
  }

  if (viewMode === 'list') {
    return (
      <Card 
        className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:glow-primary"
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Trip Image/Icon */}
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                {trip.isAiGenerated && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {/* Trip Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {trip.title}
                  </h3>
                  <Badge className={`bg-gradient-to-r ${getStatusColor(trip.status)} text-white border-0`}>
                    {getStatusText(trip.status)}
                  </Badge>
                  {trip.isAiGenerated && (
                    <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                      AI Generated
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
                  {trip.description || 'No description'}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{trip.destinationCount || 0} destinations</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{formatBudget(trip.budget)}</span>
                  </div>
                  {trip.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{trip.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress & Actions */}
            <div className="flex items-center space-x-4">
              {trip.progress !== undefined && (
                <div className="w-24">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{trip.progress}%</span>
                  </div>
                  <Progress value={trip.progress} className="h-2" />
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity gradient-primary text-white"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view
  return (
    <Card 
      className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover:glow-primary overflow-hidden"
      onClick={onClick}
    >
      {/* Card Header with Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="h-16 w-16 text-primary/60 group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`bg-gradient-to-r ${getStatusColor(trip.status)} text-white border-0`}>
            {getStatusText(trip.status)}
          </Badge>
        </div>

        {/* AI Badge */}
        {trip.isAiGenerated && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-cyber-scan"></div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
                {trip.title}
              </h3>
              {trip.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{trip.rating}</span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {trip.description || 'No description available'}
            </p>
          </div>

          {/* Trip Stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{formatDate(trip.startDate)}</p>
                <p className="text-muted-foreground text-xs">Start date</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{trip.destinationCount || 0}</p>
                <p className="text-muted-foreground text-xs">Destinations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{formatBudget(trip.budget)}</p>
                <p className="text-muted-foreground text-xs">Budget</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {trip.startDate && trip.endDate 
                    ? Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24))
                    : 'TBD'
                  }
                  {trip.startDate && trip.endDate ? ' days' : ''}
                </p>
                <p className="text-muted-foreground text-xs">Duration</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {trip.progress !== undefined && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{trip.progress}%</span>
              </div>
              <Progress value={trip.progress} className="h-2" />
            </div>
          )}

          {/* Action Button */}
          <Button 
            className="w-full gradient-primary hover:opacity-90 transition-opacity group/btn"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <span>View Trip</span>
            <MapPin className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}