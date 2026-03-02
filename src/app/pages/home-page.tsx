import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { ProductHighlights } from "../components/product-highlights";
import { Specifications } from "../components/specifications";
import { ContactRMSection } from "../components/contact-rm-section";
import { LiveSellingCounter } from "../components/live-selling-counter";
import { useEffect, useRef, useState } from "react";

export function HomePage() {
  const [showMobileCounter, setShowMobileCounter] = useState(false);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show counter when Product Highlights is intersecting or we've scrolled past it
        setShowMobileCounter(entry.isIntersecting || entry.boundingClientRect.top < 0);
      },
      { threshold: 0.1 }
    );

    if (highlightsRef.current) {
      observer.observe(highlightsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Mobile Live Selling Counter - Shows on scroll */}
      {showMobileCounter && (
        <LiveSellingCounter className="md:hidden" />
      )}
      
      <main>
        <HeroSection />
        
        {/* Product Highlights Section */}
        <div ref={highlightsRef} className="py-16 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1d1d1b] mb-4">
                Product Highlights
              </h2>
              <p className="text-gray-600 text-[16px]">
                Premium features that set Viper apart from the competition
              </p>
            </div>

            <ProductHighlights />
          </div>
        </div>

        {/* Specifications Section */}
        <Specifications />

        {/* Contact RM Section */}
        <ContactRMSection />
      </main>
    </div>
  );
}
