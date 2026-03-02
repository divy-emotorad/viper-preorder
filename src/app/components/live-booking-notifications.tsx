import { useEffect, useState } from 'react';
import { useInventory } from '../context/inventory-context';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, TrendingUp } from 'lucide-react';

export function LiveBookingNotifications() {
  const { recentBookings } = useInventory();
  const [visibleBooking, setVisibleBooking] = useState<typeof recentBookings[0] | null>(null);
  const [lastShownId, setLastShownId] = useState<string>('');

  useEffect(() => {
    // Show notification for new bookings
    if (recentBookings.length > 0) {
      const latestBooking = recentBookings[0];
      
      if (latestBooking.id !== lastShownId) {
        setVisibleBooking(latestBooking);
        setLastShownId(latestBooking.id);

        // Hide after 5 seconds
        const timer = setTimeout(() => {
          setVisibleBooking(null);
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, [recentBookings, lastShownId]);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <AnimatePresence>
      {visibleBooking && (
        <motion.div
          initial={{ opacity: 0, x: 400, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-4 xl:right-6 z-50 max-w-[280px] sm:max-w-sm hidden md:block"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#dfb001]/20 p-3 md:p-4 backdrop-blur-sm">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#dfb001]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-[#dfb001]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#1d1d1b] text-xs md:text-sm truncate">
                    A Dealer in {visibleBooking.location}
                  </p>
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-[#dfb001] flex-shrink-0" />
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  Pre booked <span className="font-semibold text-[#dfb001]">{visibleBooking.quantity} unit{visibleBooking.quantity > 1 ? 's' : ''}</span>
                </p>
                <p className="text-[10px] md:text-xs text-gray-500 mt-1">
                  {getTimeAgo(visibleBooking.timestamp)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
