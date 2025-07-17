import { ReactNode } from 'react'
import { MapPin, Sparkles } from 'lucide-react'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Futuristic Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary"></div>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full glass-effect animate-float"></div>
        <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full glass-effect animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full glass-effect animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-primary animate-cyber-scan opacity-60"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <MapPin className="h-16 w-16 text-white animate-glow-pulse" />
                <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-neon-flicker" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 animate-neon-flicker">
              Travel Planner
            </h1>
            <p className="text-xl opacity-90 max-w-md">
              Plan your perfect trips with AI-powered itineraries and futuristic maps
            </p>
          </div>
          
          <div className="space-y-4 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span>Smart Route Optimization</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Real-time Travel Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Collaborative Trip Planning</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <MapPin className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">Travel Planner</span>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}