import { useState } from 'react'
import { DestinationSearch } from '@/components/destinations/DestinationSearch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Compass, Star, MapPin, Clock, TrendingUp } from 'lucide-react'

interface Destination {
  id: string
  name: string
  address: string
  rating?: number
  category: string
  image?: string
  description?: string
}

// Mock popular destinations
const popularDestinations: Destination[] = [
  {
    id: 'pop1',
    name: 'Santorini, Greece',
    address: 'Santorini, Greece',
    rating: 4.8,
    category: 'Island',
    description: 'Beautiful Greek island with stunning sunsets and white-washed buildings'
  },
  {
    id: 'pop2',
    name: 'Machu Picchu',
    address: 'Cusco Region, Peru',
    rating: 4.9,
    category: 'Historical Site',
    description: 'Ancient Incan citadel set high in the Andes Mountains'
  },
  {
    id: 'pop3',
    name: 'Bali, Indonesia',
    address: 'Bali, Indonesia',
    rating: 4.7,
    category: 'Tropical',
    description: 'Tropical paradise with beautiful beaches, temples, and rice terraces'
  },
  {
    id: 'pop4',
    name: 'Tokyo, Japan',
    address: 'Tokyo, Japan',
    rating: 4.6,
    category: 'City',
    description: 'Vibrant metropolis blending traditional culture with modern innovation'
  }
]

const trendingCategories = [
  { name: 'Beach Destinations', count: 156, trend: '+12%' },
  { name: 'Mountain Adventures', count: 89, trend: '+8%' },
  { name: 'Cultural Sites', count: 234, trend: '+15%' },
  { name: 'Food & Wine', count: 67, trend: '+22%' },
  { name: 'Urban Exploration', count: 145, trend: '+5%' },
  { name: 'Nature & Wildlife', count: 98, trend: '+18%' }
]

export function DiscoverPage() {
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([])

  const handleAddDestination = (destination: Destination) => {
    setSelectedDestinations(prev => {
      if (prev.find(d => d.id === destination.id)) {
        return prev // Already added
      }
      return [...prev, destination]
    })
  }

  const handleRemoveDestination = (destinationId: string) => {
    setSelectedDestinations(prev => prev.filter(d => d.id !== destinationId))
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'island':
        return 'bg-blue-100 text-blue-800'
      case 'historical site':
        return 'bg-amber-100 text-amber-800'
      case 'tropical':
        return 'bg-green-100 text-green-800'
      case 'city':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Compass className="h-8 w-8 text-primary" />
          Discover Destinations
        </h1>
        <p className="text-muted-foreground">
          Find amazing places to visit and add them to your trips
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search Destinations</CardTitle>
        </CardHeader>
        <CardContent>
          <DestinationSearch onAddDestination={handleAddDestination} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Popular Destinations */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Popular Destinations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularDestinations.map((destination) => (
                <Card key={destination.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{destination.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {destination.address}
                          </p>
                        </div>
                        
                        {destination.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{destination.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(destination.category)}>
                          {destination.category}
                        </Badge>
                      </div>
                      
                      {destination.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {destination.description}
                        </p>
                      )}
                      
                      <Button
                        size="sm"
                        onClick={() => handleAddDestination(destination)}
                        disabled={selectedDestinations.some(d => d.id === destination.id)}
                        className="w-full"
                      >
                        {selectedDestinations.some(d => d.id === destination.id)
                          ? 'Added to Trip'
                          : 'Add to Trip'
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Categories */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Trending Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingCategories.map((category) => (
                <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{category.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {category.count} destinations
                        </span>
                        <span className="text-green-600 font-medium">
                          {category.trend}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Selected Destinations ({selectedDestinations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDestinations.length > 0 ? (
                <div className="space-y-3">
                  {selectedDestinations.map((destination) => (
                    <div
                      key={destination.id}
                      className="flex items-start justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{destination.name}</h4>
                        <Badge className={`${getCategoryColor(destination.category)} text-xs mt-1`}>
                          {destination.category}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveDestination(destination.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-4">
                    Create Trip with Selected
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No destinations selected yet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discover Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Destinations</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Countries</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Categories</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">New This Week</span>
                <span className="font-semibold text-green-600">+47</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}