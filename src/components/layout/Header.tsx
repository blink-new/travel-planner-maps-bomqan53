import { useState } from 'react'
import { Menu, MapPin, User, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface HeaderProps {
  onCreateTrip: () => void
  onMenuClick: () => void
}

export function Header({ onCreateTrip, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Travel Planner</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={onCreateTrip} className="hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" />
            New Trip
          </Button>
          
          <Button onClick={onCreateTrip} size="icon" className="sm:hidden">
            <Plus className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}