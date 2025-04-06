"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "@/contexts/LocationContext"

interface LocationSwitcherProps {
  className?: string
}

export function LocationSwitcher({ className }: LocationSwitcherProps) {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { selectedLocation, setSelectedLocation } = useLocation()
  
  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Different wolf images for each location
  const locationImages = {
    portland: '/wolf-light-white.png',
    salem: '/wolf-icon-black.png'
  }
  
  // Get current image based on location
  const currentImage = mounted ? locationImages[selectedLocation] : ''
  
  const toggleLocation = () => {
    const newLocation = selectedLocation === 'portland' ? 'salem' : 'portland'
    setSelectedLocation(newLocation)
    
    // Toggle theme when location changes
    setTheme(newLocation === 'portland' ? 'dark' : 'light')
  }
  
  if (!mounted) return null
  
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="mt-6 flex justify-center items-center">
        <div className="relative w-96 h-96"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedLocation}-${currentImage}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={`${selectedLocation} location`}
                width={360} 
                height={360} 
                className="object-contain w-96 h-96" 
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span 
          className={`text-lg font-bold cursor-pointer ${selectedLocation === 'portland' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => {
            setSelectedLocation('portland')
            setTheme('dark')
          }}
        >
          Portland
        </span>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative inline-flex h-8 w-14 items-center rounded-full ${selectedLocation === 'salem' ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'}`}
          onClick={toggleLocation}
          aria-label={`Switch location to ${selectedLocation === 'portland' ? 'Salem' : 'Portland'}`}
          title={`Switch location to ${selectedLocation === 'portland' ? 'Salem' : 'Portland'}`}
        >
          <motion.span 
            layout
            transition={{ 
              type: "spring", 
              stiffness: 700, 
              damping: 15,
              mass: 0.5
            }} 
            animate={{ 
              translateX: selectedLocation === 'salem' ? '1.5rem' : '0.25rem',
              scale: selectedLocation === 'salem' ? 1.1 : 1
            }}
            className={`inline-block h-7 w-7 rounded-full bg-white dark:bg-white flex items-center justify-center`}
          >
            {mounted && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={'/wolf-icon-black.png'}
                  alt="Location Toggle Icon"
                  width={20} 
                  height={20}
                  className="object-contain w-full h-full" 
                />
              </motion.div>
            )}
          </motion.span>
        </motion.button>
        
        <span 
          className={`text-lg font-bold cursor-pointer ${selectedLocation === 'salem' ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => {
            setSelectedLocation('salem')
            setTheme('light')
          }}
        >
          Salem
        </span>
      </div>
    </div>
  )
}

export default LocationSwitcher
