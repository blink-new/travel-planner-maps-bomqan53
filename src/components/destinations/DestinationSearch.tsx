import { useState } from 'react'
import { Search, MapPin, Star, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Destination {
  id: string
  name: string
  address: string
  rating?: number
  category: string
  image?: string
  description?: string
}

interface DestinationSearchProps {
  onAddDestination: (destination: Destination) => void
}

// Mock destinations for demo
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    rating: 4.6,
    category: 'Landmark',
    description: 'Iconic iron lattice tower and symbol of Paris'
  },
  {
    id: '2',
    name: 'Louvre Museum',
    address: 'Rue de Rivoli, 75001 Paris, France',
    rating: 4.7,
    category: 'Museum',
    description: 'World\'s largest art museum and historic monument'
  },
  {
    id: '3',
    name: 'Notre-Dame Cathedral',
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France',
    rating: 4.5,
    category: 'Religious Site',
    description: 'Medieval Catholic cathedral with Gothic architecture'
  },
  {
    id: '4',
    name: 'Arc de Triomphe',
    address: 'Pl. Charles de Gaulle, 75008 Paris, France',
    rating: 4.5,
    category: 'Monument',
    description: 'Triumphal arch honoring those who fought for France'
  }
]

export function DestinationSearch({ onAddDestination }: DestinationSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Destination[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setIsSearching(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockDestinations.filter(dest =>
        dest.name.toLowerCase().includes(query.toLowerCase()) ||
        dest.address.toLowerCase().includes(query.toLowerCase()) ||
        dest.category.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setIsSearching(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'landmark':
        return 'bg-blue-100 text-blue-800'
      case 'museum':
        return 'bg-purple-100 text-purple-800'
      case 'religious site':
        return 'bg-green-100 text-green-800'
      case 'monument':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search destinations, attractions, restaurants..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Searching destinations...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Search Results</h3>
          <div className="grid gap-3">
            {results.map((destination) => (
              <Card key={destination.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{destination.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {destination.address}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 ml-8">
                        <Badge className={getCategoryColor(destination.category)}>
                          {destination.category}
                        </Badge>
                        
                        {destination.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{destination.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {destination.description && (
                        <p className="text-sm text-muted-foreground ml-8 line-clamp-2">
                          {destination.description}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => onAddDestination(destination)}
                      className="ml-4 flex-shrink-0"
                    >
                      Add to Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && !isSearching && (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <h3 className="font-semibold mb-1">No destinations found</h3>
          <p className="text-sm text-muted-foreground">
            Try searching for landmarks, museums, restaurants, or attractions
          </p>
        </div>
      )}
    </div>
  )
}