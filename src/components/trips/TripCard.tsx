import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Trip {
  id: string
  title: string
  description?: string
  startDate?: string
  endDate?: string
  budget?: number
  status: string
  destinationCount?: number
}

interface TripCardProps {
  trip: Trip
  onClick: () => void
}

export function TripCard({ trip, onClick }: TripCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      case 'planning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-1">{trip.title}</CardTitle>
          <Badge className={getStatusColor(trip.status)}>
            {trip.status}
          </Badge>
        </div>
        {trip.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {trip.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(trip.startDate)}</span>
          </div>
          {trip.endDate && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(trip.endDate)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{trip.destinationCount || 0} destinations</span>
            </div>
            {trip.budget && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>${trip.budget}</span>
              </div>
            )}
          </div>
          
          <Button variant="outline" size="sm" onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}