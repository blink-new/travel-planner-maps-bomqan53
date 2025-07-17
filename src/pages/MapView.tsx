import { useState } from 'react'
import { GoogleMap } from '@/components/map/GoogleMap'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Route } from 'lucide-react'

interface Destination {
  id: string
  name: string
  latitude: number
  longitude: number
  address?: string
  category?: string
}

// Mock destinations for demo
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    latitude: 48.8584,
    longitude: 2.2945,
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    category: 'Landmark'
  },
  {
    id: '2',
    name: 'Louvre Museum',
    latitude: 48.8606,
    longitude: 2.3376,
    address: 'Rue de Rivoli, 75001 Paris, France',
    category: 'Museum'
  },
  {
    id: '3',
    name: 'Notre-Dame Cathedral',
    latitude: 48.8530,
    longitude: 2.3499,
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France',
    category: 'Religious Site'
  }
]

export function MapView() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [destinations] = useState<Destination[]>(mockDestinations)

  const handleMapClick = (lat: number, lng: number) => {
    console.log('Map clicked at:', lat, lng)
    // Handle map click for adding new destinations
  }

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'landmark':
        return 'bg-blue-100 text-blue-800'
      case 'museum':
        return 'bg-purple-100 text-purple-800'
      case 'religious site':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6">
      {/* Map Container */}
      <div className="flex-1 min-h-[500px] lg:min-h-full">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Interactive Map
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)]">
            <GoogleMap
              destinations={destinations}
              onMapClick={handleMapClick}
              className="h-full"
            />
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        {/* Map Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Map Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Route className="h-4 w-4 mr-2" />
              Plan Route
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </CardContent>
        </Card>

        {/* Destinations List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Destinations ({destinations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {destinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedDestination?.id === destination.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedDestination(destination)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold text-sm">
                          {destination.name}
                        </h4>
                      </div>
                      
                      {destination.category && (
                        <Badge 
                          className={`${getCategoryColor(destination.category)} text-xs mb-2`}
                        >
                          {destination.category}
                        </Badge>
                      )}
                      
                      {destination.address && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {destination.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {destinations.length === 0 && (
                <div className="text-center py-8">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No destinations added yet
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Selected Destination Details */}
        {selectedDestination && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Destination Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">{selectedDestination.name}</h4>
                {selectedDestination.category && (
                  <Badge className={getCategoryColor(selectedDestination.category)}>
                    {selectedDestination.category}
                  </Badge>
                )}
              </div>
              
              {selectedDestination.address && (
                <div>
                  <p className="text-sm font-medium mb-1">Address</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDestination.address}
                  </p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium mb-1">Coordinates</p>
                <p className="text-sm text-muted-foreground">
                  {selectedDestination.latitude.toFixed(4)}, {selectedDestination.longitude.toFixed(4)}
                </p>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  Get Directions
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}