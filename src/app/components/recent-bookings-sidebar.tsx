import { useInventory } from '../context/inventory-context';
import { CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function RecentBookingsSidebar() {
  const { recentBookings } = useInventory();

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dfb001]/20 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-[#dfb001] rounded-full animate-pulse"></div>
        <h3 className="font-semibold text-[#1d1d1b]">Live Activity</h3>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
        {recentBookings.slice(0, 8).map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2 p-3 bg-[#fafafa] rounded-lg hover:bg-[#dfb001]/10 transition border border-transparent hover:border-[#dfb001]/30"
          >
            <CheckCircle className="w-4 h-4 text-[#dfb001] flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1d1d1b] truncate">
                {booking.dealerName}
              </p>
              <p className="text-xs text-gray-600">
                {booking.quantity} unit{booking.quantity > 1 ? 's' : ''} • {getTimeAgo(booking.timestamp)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-center text-gray-500">
          Real-time dealer activity
        </p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FAFAFA;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dfb001;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
