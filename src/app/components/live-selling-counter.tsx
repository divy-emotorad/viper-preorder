import { useEffect, useState, useRef } from 'react';
import { useInventory } from '../context/inventory-context';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function LiveSellingCounter({ className }: { className?: string }) {
  const { availableUnits, totalUnits } = useInventory();
  const [previousCount, setPreviousCount] = useState(availableUnits);
  const [showPulse, setShowPulse] = useState(false);
  const [countdown, setCountdown] = useState(14);
  const [recentSales, setRecentSales] = useState(0);

  // Calculate recent sales in last 2 hours
  useEffect(() => {
    const soldUnits = totalUnits - availableUnits;
    setRecentSales(Math.min(soldUnits, 11)); // Cap at a reasonable number
  }, [availableUnits, totalUnits]);

  // Countdown timer for next update
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) return 14;
        return prev - 1;
      });
    }, 140000);

    return () => clearInterval(timer);
  }, []);

  // Detect when count decreases
  useEffect(() => {
    if (availableUnits < previousCount) {
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 300);
    }
    setPreviousCount(availableUnits);
  }, [availableUnits, previousCount]);

  const soldUnits = totalUnits - availableUnits;
  const percentageSold = ((soldUnits / totalUnits) * 100).toFixed(0);

  // Reusable Content Component
  const WidgetContent = ({ compact = false }) => (
    <div className="relative z-10 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#dfb001] rounded-full animate-pulse flex-shrink-0" />
              <p className="text-[10px] font-medium text-[#dfb001] uppercase truncate">
                Live Sales
              </p>
            </div>
            <div className="flex items-center gap-0.5 text-[#dfb001] text-[9px]">
              <TrendingUp className="w-2.5 h-2.5" />
              Fast Selling
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={availableUnits}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-1.5"
            >
              <span
                className="text-xl font-bold text-white leading-none"
                style={{
                  textShadow: "0 0 8px rgba(223, 176, 1, 0.3)",
                }}
              >
                {soldUnits}
              </span>
              <span className="text-xs text-white/90">
                out of {totalUnits} units sold
              </span>
            </motion.div>
          </AnimatePresence>

          <div className="mt-2 h-1 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#dfb001] to-[#e5c100] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentageSold}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-[9px] text-white/70">{percentageSold}% Sold</p>
            <span className="text-[9px] text-white/60">•</span>
            <p className="text-[9px] text-[#dfb001] font-medium">
              {recentSales} sold in 2hrs
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={className}>
      {/* Anchor for IntersectionObserver */}
      <div className="absolute top-0 w-full h-px -translate-y-20 pointer-events-none opacity-0" />

      {/* Static Version (Centered in Hero) */}
      <div className={`transition-all duration-500 ease-in-out opacity-0 translate-y-4 pointer-events-none absolute w-full flex justify-center z-30 hidden md:flex`}>
        <div
          className="rounded-xl shadow-xl backdrop-blur-md relative overflow-hidden flex items-center justify-between px-8"
          style={{
            width: '622px',
            height: '92px',
            background: '#1d1d1b',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(223, 176, 1, 0.3)',
          }}
        >
           <div 
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(223, 176, 1, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            }}
          />
          
          {/* Horizontal Content for 622x92 Layout */}
          
          {/* Left: Counter */}
          <div className="flex flex-col justify-center gap-1 min-w-[180px] z-10">
             <div className="flex items-center justify-between gap-1.5 mb-1 pr-4">
                <div className="flex items-center gap-1.5">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 bg-[#dfb001] rounded-full" />
                    <div className="absolute inset-0 w-1.5 h-1.5 bg-[#dfb001] rounded-full animate-ping opacity-75" />
                  </div>
                  <p className="text-[10px] font-medium text-[#dfb001] tracking-wide uppercase">
                    Live Sales Update
                  </p>
                </div>
             </div>
             <div className="flex items-baseline gap-1.5">
               <span className="text-2xl font-bold text-white leading-none">{soldUnits}</span>
               <span className="text-sm text-white/90">out of {totalUnits} units sold</span>
             </div>
          </div>

          {/* Middle: Progress */}
          <div className="flex flex-col justify-center flex-1 px-8 z-10">
             <div className="flex justify-between text-[10px] text-white/70 mb-1.5">
                <span>{percentageSold}% Sold</span>
                <span className="text-[#dfb001] flex items-center gap-1"><TrendingUp className="w-3 h-3"/> Fast Selling</span>
             </div>
             <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#dfb001] to-[#e5c100]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentageSold}%` }}
                  transition={{ duration: 0.5 }}
                />
             </div>
             <p className="text-[10px] text-white/60 mt-1.5 text-center">
               <span className="text-[#dfb001] font-semibold">{recentSales} cycles</span> sold in last 2hrs
             </p>
          </div>

          {/* Right: Countdown */}
          <div className="flex flex-col items-end justify-center z-10 min-w-[100px]">
             <p className="text-[10px] text-white/70 mb-1">Next update</p>
             <div className="px-3 py-1 bg-[#dfb001] rounded text-[#1d1d1b] font-bold text-sm tabular-nums">
                00:{countdown.toString().padStart(2, '0')}
             </div>
          </div>

          {/* Urgency Badge - Removed */}


        </div>
      </div>

      {/* Fixed Popup Version (Desktop) */}
      <AnimatePresence>
        { (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="fixed right-4 bottom-10 z-40 w-[220px] hidden lg:block xl:right-6"
          >
            <div
              className="rounded-xl p-4 shadow-xl backdrop-blur-md relative overflow-hidden"
              style={{
                background: '#1d1d1b',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(223, 176, 1, 0.3)',
              }}
            >
              <div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(223, 176, 1, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                }}
              />
              <WidgetContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Version - Always Bottom Bar (hidden on md+) */}
      <div className="fixed bottom-3 left-3 right-3 z-40 lg:hidden">
        <div
          className="rounded-xl p-3 shadow-xl backdrop-blur-md"
          style={{
            background: '#1d1d1b',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#dfb001] rounded-full animate-pulse flex-shrink-0" />
                  <p className="text-[10px] font-medium text-[#dfb001] uppercase truncate">Live Sales</p>
                </div>
                <div className="flex items-center gap-0.5 text-[#dfb001] text-[9px]">
                  <TrendingUp className="w-2.5 h-2.5" />
                  Fast Selling
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={availableUnits}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 5, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-baseline gap-1.5"
                >
                  <span 
                    className="text-xl font-bold text-white leading-none"
                    style={{
                      textShadow: '0 0 8px rgba(223, 176, 1, 0.3)'
                    }}
                  >
                    {soldUnits}
                  </span>
                  <span className="text-xs text-white/90">out of {totalUnits} units sold</span>
                </motion.div>
              </AnimatePresence>

              <div className="mt-2 h-1 bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#dfb001] to-[#e5c100] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentageSold}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-[9px] text-white/70">{percentageSold}% Sold</p>
                <span className="text-[9px] text-white/60">•</span>
                <p className="text-[9px] text-[#dfb001] font-medium">{recentSales} sold in 2hrs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Backward compatibility
export function LiveSellingCounterMobile() {
  return null;
}
