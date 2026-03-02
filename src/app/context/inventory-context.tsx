import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InventoryContextType {
  availableUnits: number;
  totalUnits: number;
  reduceInventory: (quantity: number) => void;
  recentBookings: DealerBooking[];
  addBooking: (dealerName: string, quantity: number) => void;
}

export interface DealerBooking {
  id: string;
  dealerName: string;
  quantity: number;
  timestamp: number;
  location: string;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Mock initial bookings for social proof
const mockBookings: DealerBooking[] = [
  { id: '1', dealerName: 'Sharma Motors', quantity: 5, timestamp: Date.now() - 120000, location: 'Mumbai' },
  { id: '2', dealerName: 'Green Wheels Pvt Ltd', quantity: 3, timestamp: Date.now() - 300000, location: 'Delhi' },
  { id: '3', dealerName: 'Eco Bikes India', quantity: 2, timestamp: Date.now() - 480000, location: 'Bangalore' },
  { id: '4', dealerName: 'City Cycles', quantity: 4, timestamp: Date.now() - 600000, location: 'Pune' },
  { id: '5', dealerName: 'Speed Motors', quantity: 1, timestamp: Date.now() - 720000, location: 'Chennai' },
];

export function InventoryProvider({ children }: { children: ReactNode }) {
  const TOTAL_UNITS = 300;
  
  // Initialize from localStorage or use default
  const [availableUnits, setAvailableUnits] = useState(() => {
    const stored = localStorage.getItem('inventoryCount');
    return stored ? parseInt(stored) : 25; // Starting with 57 (93 already booked)
  });

  const [recentBookings, setRecentBookings] = useState<DealerBooking[]>(() => {
    const stored = localStorage.getItem('recentBookings');
    return stored ? JSON.parse(stored) : mockBookings;
  });

  useEffect(() => {
    localStorage.setItem('inventoryCount', availableUnits.toString());
  }, [availableUnits]);

  useEffect(() => {
    localStorage.setItem('recentBookings', JSON.stringify(recentBookings));
  }, [recentBookings]);

  // Simulate random bookings from other dealers
  useEffect(() => {
    const dealerNames = [
      'Velocity Bikes',
      'Metro Cycles',
      'Elite Motors',
      'Prime Wheels',
      'Urban Riders',
      'Swift Motors',
      'NextGen Bikes',
      'Future Mobility',
      'EV Masters',
      'GreenTech Dealers'
    ];

    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad'];

    const interval = setInterval(() => {
      // Random chance of a new booking (20% chance every interval)
      if (Math.random() < 0.2 && availableUnits > 0) {
        const randomDealer = dealerNames[Math.floor(Math.random() * dealerNames.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomQuantity = Math.floor(Math.random() * 3) + 1; // 1-3 units

        if (randomQuantity <= availableUnits) {
          addBooking(`${randomDealer} (${randomCity})`, randomQuantity);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [availableUnits]);

  const reduceInventory = (quantity: number) => {
    setAvailableUnits(prev => Math.max(0, prev - quantity));
  };

  const addBooking = (dealerName: string, quantity: number) => {
    const newBooking: DealerBooking = {
      id: Date.now().toString(),
      dealerName,
      quantity,
      timestamp: Date.now(),
      location: dealerName.includes('(') ? dealerName.split('(')[1].replace(')', '') : 'India'
    };

    setRecentBookings(prev => [newBooking, ...prev].slice(0, 20)); // Keep last 20 bookings
    reduceInventory(quantity);
  };

  return (
    <InventoryContext.Provider
      value={{
        availableUnits,
        totalUnits: TOTAL_UNITS,
        reduceInventory,
        recentBookings,
        addBooking
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
