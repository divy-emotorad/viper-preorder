import axios from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface InventoryContextType {
  availableUnits: number;
  totalUnits: number;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);


export function InventoryProvider({ children }: { children: ReactNode }) {
  const [totalUnits, setTotalUnits] = useState(null);
  const [availableUnits, setAvailableUnits] = useState(null);
  
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          "https://www.emotorad.com/api/dealer/viper/inventory",
        );
        if (!res.data) {
          return;
        }
        setTotalUnits(res.data.total);
        setAvailableUnits(res.data.balance_qty);
      } catch (error) {
        console.error("Error fetching inventory:", error.message);
      }
    };

    fetchInventory();

    setInterval(fetchInventory, 1 *60 *1000); // Fetch every 1 minute

  }, []);

  
  const TOTAL_UNITS = totalUnits;

  return (
    <InventoryContext.Provider
      value={{
        availableUnits,
        totalUnits: TOTAL_UNITS,
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
