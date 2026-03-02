import { TrendingUp, Battery, Users } from "lucide-react";

export function FeatureCards() {
  const features = [
    {
      icon: TrendingUp,
      title: "High Dealer Margin",
      description: "Earn competitive margins on every sale. Premium pricing with excellent profit potential for dealers.",
      color: "#dfb001"
    },
    {
      icon: Battery,
      title: "Premium Build & Battery",
      description: "Top-quality components with long-range battery. Industry-leading warranty and after-sales support.",
      color: "#dfb001"
    },
    {
      icon: Users,
      title: "Strong Market Demand",
      description: "High customer interest and brand recognition. Pre-qualified leads and marketing support provided.",
      color: "#dfb001"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1d1d1b] mb-4">
            Why Dealers Should Pre-Book
          </h2>
          <p className="text-gray-600 text-lg">
            Exclusive benefits for our authorized dealer network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[#fafafa] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-[#dfb001]"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1b] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
