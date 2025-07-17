import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface GoogleMapProps {
  destinations?: Array<{
    id: string
    name: string
    latitude: number
    longitude: number
    address?: string
  }>
  onMapClick?: (lat: number, lng: number) => void
  className?: string
}

export function GoogleMap({ destinations = [], onMapClick, className = '' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        // For demo purposes, we'll show a placeholder map
        // In production, you would use a real Google Maps API key
        const loader = new Loader({
          apiKey: 'DEMO_KEY', // Replace with actual API key
          version: 'weekly',
          libraries: ['places']
        })

        // Since we don't have a real API key, we'll create a mock map
        if (mapRef.current) {
          // Create a simple placeholder div that looks like a map
          mapRef.current.innerHTML = `
            <div class="w-full h-full bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center">
              <div class="text-center p-8">
                <div class="text-blue-600 mb-2">🗺️</div>
                <h3 class="text-lg font-semibold text-blue-800 mb-2">Google Maps Integration</h3>
                <p class="text-blue-600 text-sm">Map will appear here with Google Maps API key</p>
                <p class="text-blue-500 text-xs mt-2">${destinations.length} destinations ready to display</p>
              </div>
            </div>
          `
          setIsLoaded(true)
        }
      } catch (err) {
        setError('Failed to load map')
        console.error('Map loading error:', err)
      }
    }

    initMap()
  }, [destinations.length])

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-8 text-center ${className}`}>
        <div className="text-red-600 mb-2">⚠️</div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Map Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full h-full min-h-[400px] rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}