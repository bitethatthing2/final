'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type LocationType = 'portland' | 'salem';

interface LocationData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  serviceOptions: string[];
  hours: {
    [key: string]: string;
  };
  embedUrl: string;
}

interface LocationContextType {
  selectedLocation: LocationType;
  setSelectedLocation: (location: LocationType) => void;
  showLocationModal: boolean;
  setShowLocationModal: (show: boolean) => void;
  locationData: {
    [key in LocationType]: LocationData;
  };
}

export const defaultLocationData = {
  portland: {
    name: "The Side Hustle Bar - Portland",
    description: "Our original location in downtown Portland. Come enjoy our famous tacos, craft cocktails, and vibrant nightlife atmosphere.",
    address: "327 SW Morrison St, Portland, OR 97204",
    phone: "(503) 391-9977",
    email: "contact@thesidehustleportland.com",
    serviceOptions: ["Dine-in", "Takeout", "Full Bar", "Late Night", "Weekend Brunch"],
    hours: {
      Sunday: "10 AM - 12 AM",
      Monday: "10 AM - 11 PM",
      Tuesday: "10 AM - 11 PM",
      Wednesday: "10 AM - 11 PM",
      Thursday: "10 AM - 1 AM",
      Friday: "10 AM - 2:30 AM",
      Saturday: "10 AM - 2:30 AM"
    },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.930311185878!2d-122.6788063!3d45.5196783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a0688b1627d%3A0xb04e56408f27d08e!2s327%20SW%20Morrison%20St%2C%20Portland%2C%20OR%2097204!5e0!3m2!1sen!2sus!4v1678886400001!5m2!1sen!2sus"
  },
  salem: {
    name: "The Side Hustle Bar - Salem",
    description: "Margaritas and Mexican fare round out the menu at this high-energy sports bar and nightclub.",
    address: "145 Liberty St NE Suite &#35;101, Salem, OR 97301",
    phone: "(503) 391-9977",
    email: "contact@thesidehustlesalem.com",
    serviceOptions: ["Dine-in", "Takeout", "Full Bar", "Has outdoor seating", "Serves great cocktails", "Has dancing"],
    hours: {
      Sunday: "10 AM - 11 PM",
      Monday: "10 AM - 11 PM",
      Tuesday: "10 AM - 11 PM",
      Wednesday: "10 AM - 11 PM",
      Thursday: "10 AM - 12 AM",
      Friday: "10 AM - 2 AM",
      Saturday: "10 AM - 2 AM"
    },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2827.9999999999995!2d-123.035!3d44.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a1c50000001%3A0x123456789abcdef0!2s145%20Liberty%20St%20NE%20%23101%2C%20Salem%2C%20OR%2097301!5e0!3m2!1sen!2sus!4v1678886500001!5m2!1sen!2sus"
  }
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('portland');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationData] = useState(defaultLocationData);

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      showLocationModal,
      setShowLocationModal,
      locationData
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export type { LocationType, LocationData };
export { LocationContext }; 
