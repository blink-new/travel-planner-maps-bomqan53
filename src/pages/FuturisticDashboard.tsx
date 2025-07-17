import { useState, useEffect } from 'react'
import { Plus, Calendar, MapPin, TrendingUp, Zap, Users, Globe, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { FuturisticTripCard } from '@/components/trips/FuturisticTripCard'
import { GridView } from '@/components/views/GridView'
import { ListView } from '@/components/views/ListView'

interface Trip {
  id: string
  title: string
  description?: string
  startDate?: string
  endDate?: string
  budget?: number
  status: string
  destinationCount?: number
  progress?: number
  rating?: number
  isAiGenerated?: boolean
}

interface FuturisticDashboardProps {
  onCreateTrip: () => void
  onSelectTrip: (trip: Trip) => void
  viewMode: 'grid' | 'list' | 'map'
}

// Enhanced mock data with more futuristic features
const mockTrips: Trip[] = [
  {
    id: '1',
    title: 'Neural Tokyo Experience',
    description: 'AI-curated journey through Tokyo\'s cyberpunk districts and traditional temples',
    startDate: '2024-07-15',
    endDate: '2024-07-30',
    budget: 3500,
    status: 'planning',
    destinationCount: 12,
    progress: 65,
    rating: 4.8,
    isAiGenerated: true
  },
  {
    id: '2',
    title: 'Quantum Europe Circuit',
    description: 'Multi-dimensional exploration of European capitals with AR guides',
    startDate: '2024-09-10',
    endDate: '2024-09-25',
    budget: 4200,
    status: 'active',
    destinationCount: 8,
    progress: 30,
    rating: 4.9,
    isAiGenerated: true
  },
  {
    id: '3',
    title: 'Holographic Bali Retreat',
    description: 'Immersive wellness journey with virtual meditation guides',
    startDate: '2024-06-01',
    endDate: '2024-06-10',
    budget: 2800,
    status: 'completed',
    destinationCount: 6,
    progress: 100,
    rating: 5.0,
    isAiGenerated: false
  },
  {
    id: '4',
    title: 'Mars Colony Preview',
    description: 'Virtual reality preview of future Mars settlements',
    startDate: '2024-12-01',
    endDate: '2024-12-07',
    budget: 5000,
    status: 'planning',
    destinationCount: 4,
    progress: 15,
    isAiGenerated: true
  }
]

const achievements = [
  { id: 1, title: 'AI Pioneer', description: 'Created 5 AI-generated trips', icon: Zap, color: 'from-purple-500 to-pink-500' },
  { id: 2, title: 'Globe Trotter', description: 'Visited 25 countries', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { id: 3, title: 'Social Explorer', description: 'Connected with 100 travelers', icon: Users, color: 'from-green-500 to-emerald-500' },
]

export function FuturisticDashboard({ onCreateTrip, onSelectTrip, viewMode }: FuturisticDashboardProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [stats, setStats] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    totalDestinations: 0,
    totalBudget: 0,
    aiTrips: 0,
    avgRating: 0
  })

  useEffect(() => {
    setTrips(mockTrips)
    
    // Calculate enhanced stats
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
    const aiTrips = mockTrips.filter(trip => trip.isAiGenerated).length
    const avgRating = mockTrips.reduce((sum, trip) => sum + (trip.rating || 0), 0) / mockTrips.length
    
    setStats({
      totalTrips,
      upcomingTrips,
      totalDestinations,
      totalBudget,
      aiTrips,
      avgRating
    })
  }, [])

  const recentTrips = trips.slice(0, viewMode === 'grid' ? 6 : 4)

  const StatCard = ({ title, value, subtitle, icon: Icon, gradient, badge }: any) => (
    <Card className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:glow-primary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          {badge && (
            <Badge className="bg-accent/20 text-accent border-accent/30">
              {badge}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl glass-effect border border-primary/20 p-8">
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome to the Future of Travel
              </h1>
              <p className="text-muted-foreground">
                Plan your perfect trips with AI-powered itineraries and quantum navigation
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-float">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button onClick={onCreateTrip} size="lg" className="gradient-primary hover:opacity-90 group">
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              Create AI Trip
            </Button>
            <Button variant="outline" size="lg" className="glass-effect border-primary/20 hover:border-primary/40">
              <MapPin className="h-5 w-5 mr-2" />
              Explore Destinations
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="Total Trips"
          value={stats.totalTrips}
          subtitle={`${stats.upcomingTrips} upcoming`}
          icon={Calendar}
          gradient="from-blue-500 to-cyan-500"
        />
        
        <StatCard
          title="Destinations"
          value={stats.totalDestinations}
          subtitle="Places to visit"
          icon={MapPin}
          gradient="from-green-500 to-emerald-500"
        />
        
        <StatCard
          title="Total Budget"
          value={`$${stats.totalBudget.toLocaleString()}`}
          subtitle="Across all trips"
          icon={TrendingUp}
          gradient="from-purple-500 to-pink-500"
        />
        
        <StatCard
          title="AI Trips"
          value={stats.aiTrips}
          subtitle="AI-generated"
          icon={Zap}
          gradient="from-yellow-500 to-orange-500"
          badge="New"
        />
        
        <StatCard
          title="Avg Rating"
          value={stats.avgRating.toFixed(1)}
          subtitle="Trip satisfaction"
          icon={Star}
          gradient="from-pink-500 to-rose-500"
        />
        
        <StatCard
          title="Neural Score"
          value="98.5"
          subtitle="AI compatibility"
          icon={TrendingUp}
          gradient="from-indigo-500 to-purple-500"
          badge="Elite"
        />
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card key={achievement.id} className="glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${achievement.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Trips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Trips</h2>
          <Button variant="outline" className="glass-effect border-primary/20 hover:border-primary/40">
            View All
          </Button>
        </div>
        
        {recentTrips.length > 0 ? (
          viewMode === 'grid' ? (
            <GridView columns={3}>
              {recentTrips.map((trip) => (
                <FuturisticTripCard
                  key={trip.id}
                  trip={trip}
                  onClick={() => onSelectTrip(trip)}
                  viewMode="grid"
                />
              ))}
            </GridView>
          ) : (
            <ListView>
              {recentTrips.map((trip) => (
                <FuturisticTripCard
                  key={trip.id}
                  trip={trip}
                  onClick={() => onSelectTrip(trip)}
                  viewMode="list"
                />
              ))}
            </ListView>
          )
        ) : (
          <Card className="p-12 text-center glass-effect border-primary/20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4 animate-float">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No trips yet</h3>
            <p className="text-muted-foreground mb-4">
              Start planning your first quantum adventure
            </p>
            <Button onClick={onCreateTrip} className="gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Trip
            </Button>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 glass-effect border-primary/20 hover:border-primary/40 group">
            <div className="text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span>AI Trip Planner</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-20 glass-effect border-primary/20 hover:border-primary/40 group">
            <div className="text-center">
              <MapPin className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span>Explore Map</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-20 glass-effect border-primary/20 hover:border-primary/40 group">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span>Find Travelers</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-20 glass-effect border-primary/20 hover:border-primary/40 group">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span>Travel Analytics</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}