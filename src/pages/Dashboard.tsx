import { useState, useEffect } from 'react'
import { Plus, Calendar, MapPin, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TripCard } from '@/components/trips/TripCard'

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

interface DashboardProps {
  onCreateTrip: () => void
  onSelectTrip: (trip: Trip) => void
}

// Mock data for demo
const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Summer Europe Adventure',
    description: 'Exploring the beautiful cities of Paris, Rome, and Barcelona',
    startDate: '2024-07-15',
    endDate: '2024-07-30',
    budget: 3500,
    status: 'planning',
    destinationCount: 8
  },
  {
    id: '2',
    title: 'Tokyo Food Tour',
    description: 'Discovering authentic Japanese cuisine and culture',
    startDate: '2024-09-10',
    endDate: '2024-09-20',
    budget: 2800,
    status: 'active',
    destinationCount: 12
  },
  {
    id: '3',
    title: 'New York City Weekend',
    description: 'Quick getaway to the Big Apple',
    startDate: '2024-06-01',
    endDate: '2024-06-03',
    budget: 1200,
    status: 'completed',
    destinationCount: 6
  }
]

export function Dashboard({ onCreateTrip, onSelectTrip }: DashboardProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [stats, setStats] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    totalDestinations: 0,
    totalBudget: 0
  })

  useEffect(() => {
    // Load trips (in real app, this would be from API/database)
    setTrips(mockTrips)
    
    // Calculate stats
    const totalTrips = mockTrips.length
    const upcomingTrips = mockTrips.filter(trip => 
      trip.status === 'planning' || trip.status === 'active'
    ).length
    const totalDestinations = mockTrips.reduce((sum, trip) => 
      sum + (trip.destinationCount || 0), 0
    )
    const totalBudget = mockTrips.reduce((sum, trip) => 
      sum + (trip.budget || 0), 0
    )
    
    setStats({
      totalTrips,
      upcomingTrips,
      totalDestinations,
      totalBudget
    })
  }, [])

  const recentTrips = trips.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Travel Planner</h1>
        <p className="text-muted-foreground mb-6">
          Plan your perfect trips with integrated maps and smart itineraries
        </p>
        <Button onClick={onCreateTrip} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create Your First Trip
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrips}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingTrips} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDestinations}</div>
            <p className="text-xs text-muted-foreground">
              Places to visit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all trips
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Trip</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalTrips > 0 ? Math.round(stats.totalBudget / stats.totalTrips).toLocaleString() : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Average budget
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Trips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Trips</h2>
          <Button variant="outline" onClick={() => {/* Navigate to trips page */}}>
            View All
          </Button>
        </div>
        
        {recentTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onClick={() => onSelectTrip(trip)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No trips yet</h3>
            <p className="text-muted-foreground mb-4">
              Start planning your first adventure
            </p>
            <Button onClick={onCreateTrip}>
              <Plus className="h-4 w-4 mr-2" />
              Create Trip
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}