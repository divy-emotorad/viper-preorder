import { useInventory } from '../context/inventory-context';
import { Package, Users } from 'lucide-react';
import { motion } from 'motion/react';

export function InventoryTicker() {
  const { availableUnits, totalUnits } = useInventory();
  
  const soldUnits = totalUnits - availableUnits;
  const percentageSold = ((soldUnits / totalUnits) * 100).toFixed(0);

  return (
    <div className="w-full bg-[#1d1d1b] shadow-lg border-b border-[#dfb001]/30">
      <div className="max-w-[1400px] mx-auto px-6 h-auto md:h-[72px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 py-4 md:py-0">
          {/* Units Remaining Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full md:w-auto bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-inner border border-white/10 hover:bg-white/10 transition-all duration-200"
            style={{ 
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#dfb001] rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-[#1d1d1b]" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <p className="text-[#dfb001] text-xs font-medium leading-tight mb-1">
                  Units Remaining
                </p>
                <motion.p 
                  key={availableUnits}
                  initial={{ scale: 1.1, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-white font-bold text-[20px] leading-none"
                >
                  {availableUnits} / {totalUnits}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Divider - Desktop Only */}
          <div className="hidden md:block h-12 w-[1px] bg-white/15" />

          {/* Dealers Registered Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full md:w-auto bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-inner border border-white/10 hover:bg-white/10 transition-all duration-200"
            style={{ 
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#dfb001] rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#1d1d1b]" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <p className="text-[#dfb001] text-xs font-medium leading-tight mb-1">
                  Dealers Registered
                </p>
                <p className="text-white font-bold text-[20px] leading-none">
                  <span className="text-[22px]">{totalDealers}+</span> Dealers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider - Desktop Only */}
          <div className="hidden md:block h-12 w-[1px] bg-white/15" />

          {/* Pre-Booked Badge */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full md:w-auto bg-[#dfb001] rounded-full px-[18px] py-2.5 hover:bg-[#c99e00] transition-all duration-200"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            <p className="text-[#1d1d1b] font-bold text-sm text-center whitespace-nowrap">
              {percentageSold}% Pre-booked
              {availableUnits < 50 && (
                <span className="ml-2 inline-block px-2.5 py-1 bg-[#1d1d1b] text-[#dfb001] text-xs font-bold rounded-full animate-pulse">
                  HURRY!
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
