import { useState, useEffect } from 'react'
import { blink } from '@/lib/blink'
import { FuturisticHeader } from '@/components/layout/FuturisticHeader'
import { FuturisticSidebar } from '@/components/layout/FuturisticSidebar'
import { FuturisticDashboard } from '@/pages/FuturisticDashboard'
import { MapView } from '@/pages/MapView'
import { DiscoverPage } from '@/pages/DiscoverPage'
import { AuthPage } from '@/pages/AuthPage'
import { CreateTripDialog } from '@/components/trips/CreateTripDialog'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  displayName?: string
}

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

type ViewMode = 'grid' | 'list' | 'map'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showCreateTrip, setShowCreateTrip] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleCreateTrip = async (tripData: {
    title: string
    description: string
    startDate: string
    endDate: string
    budget: string
  }) => {
    try {
      // In a real app, this would save to the database
      console.log('Creating trip:', tripData)
      
      toast.success('Trip created successfully!', {
        description: `"${tripData.title}" has been added to your trips.`
      })
      
      setShowCreateTrip(false)
    } catch (error) {
      console.error('Error creating trip:', error)
      toast.error('Failed to create trip', {
        description: 'Please try again later.'
      })
    }
  }

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip)
    setActiveTab('map') // Navigate to map view when trip is selected
    toast.info(`Viewing trip: ${trip.title}`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <FuturisticDashboard
            onCreateTrip={() => setShowCreateTrip(true)}
            onSelectTrip={handleSelectTrip}
            viewMode={viewMode}
          />
        )
      case 'trips':
        return (
          <FuturisticDashboard
            onCreateTrip={() => setShowCreateTrip(true)}
            onSelectTrip={handleSelectTrip}
            viewMode={viewMode}
          />
        )
      case 'discover':
        return <DiscoverPage />
      case 'map':
        return <MapView />
      case 'analytics':
        return (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto animate-float">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Travel Analytics</h2>
            <p className="text-muted-foreground">Advanced travel insights coming soon...</p>
          </div>
        )
      case 'social':
        return (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto animate-float">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Social Hub</h2>
            <p className="text-muted-foreground">Connect with fellow travelers...</p>
          </div>
        )
      case 'bookmarks':
        return (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto animate-float">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Saved Places</h2>
            <p className="text-muted-foreground">Your bookmarked destinations...</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 flex items-center justify-center mx-auto animate-float">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-muted-foreground">Customize your experience...</p>
          </div>
        )
      default:
        return (
          <FuturisticDashboard
            onCreateTrip={() => setShowCreateTrip(true)}
            onSelectTrip={handleSelectTrip}
            viewMode={viewMode}
          />
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent animate-ping mx-auto opacity-20"></div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Initializing Neural Network...</p>
            <p className="text-muted-foreground text-sm">Connecting to quantum servers</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-background">
      <FuturisticHeader
        onCreateTrip={() => setShowCreateTrip(true)}
        onMenuClick={() => setShowMobileSidebar(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <FuturisticSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="h-full"
          />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
          <SheetContent side="left" className="p-0 w-64 glass-effect border-primary/20">
            <FuturisticSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab)
                setShowMobileSidebar(false)
              }}
              className="h-full border-0"
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Create Trip Dialog */}
      <CreateTripDialog
        open={showCreateTrip}
        onOpenChange={setShowCreateTrip}
        onCreateTrip={handleCreateTrip}
      />

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  )
}

export default App