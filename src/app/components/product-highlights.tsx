import image_0ef1c17bee2027143e49f5a4ceefc611186ad78a from '../../assets/0ef1c17bee2027143e49f5a4ceefc611186ad78a.png';
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgViper from "../../assets/f8ad8f7e23a5e5297cae8eab78d36ed49dc123a7.png";
import imgOverlay from "../../assets/ee56c16d991d3e8fc8d68a2dc195d3da5bde7d43.png";

const svgPaths = {
  motor: "M3.99764 13.9917C3.80852 13.9924 3.62309 13.9394 3.46291 13.8388C3.30273 13.7383 3.17436 13.5943 3.09273 13.4237C3.01109 13.2531 2.97954 13.0629 3.00173 12.8751C3.02392 12.6872 3.09895 12.5096 3.2181 12.3627L13.1123 2.16872C13.1865 2.08305 13.2876 2.02516 13.3991 2.00455C13.5105 1.98394 13.6257 2.00183 13.7256 2.05529C13.8256 2.10875 13.9044 2.1946 13.9491 2.29875C13.9938 2.4029 14.0018 2.51916 13.9718 2.62845L12.0529 8.6449C11.9963 8.79633 11.9773 8.95923 11.9975 9.11963C12.0177 9.28002 12.0765 9.43311 12.1689 9.56578C12.2613 9.69845 12.3845 9.80673 12.5279 9.88133C12.6713 9.95593 12.8307 9.99463 12.9923 9.9941H19.9882C20.1773 9.99346 20.3628 10.0465 20.5229 10.147C20.6831 10.2476 20.8115 10.3915 20.8931 10.5621C20.9748 10.7327 21.0063 10.923 20.9841 11.1108C20.9619 11.2986 20.8869 11.4763 20.7677 11.6231L10.8736 21.8171C10.7994 21.9028 10.6982 21.9607 10.5868 21.9813C10.4753 22.0019 10.3602 21.984 10.2602 21.9306C10.1603 21.8771 10.0815 21.7912 10.0367 21.6871C9.99202 21.5829 9.98403 21.4667 10.0141 21.3574L11.933 15.3409C11.9895 15.1895 12.0085 15.0266 11.9883 14.8662C11.9681 14.7058 11.9093 14.5527 11.8169 14.4201C11.7246 14.2874 11.6014 14.1791 11.458 14.1045C11.3145 14.0299 11.1552 13.9912 10.9935 13.9917H3.99764Z",
  battery1: "M11.9929 7.99528C13.6488 7.99528 14.9912 6.65293 14.9912 4.99705C14.9912 3.34117 13.6488 1.99882 11.9929 1.99882C10.337 1.99882 8.99469 3.34117 8.99469 4.99705C8.99469 6.65293 10.337 7.99528 11.9929 7.99528Z",
  battery2: "M6.49617 7.99528C6.06368 7.99977 5.64431 8.14442 5.30102 8.40752C4.95773 8.67062 4.70905 9.03796 4.59229 9.45442L2.09876 18.4891C2.02321 18.7815 2.0149 19.0872 2.07446 19.3833C2.13402 19.6794 2.2599 19.9581 2.44264 20.1986C2.62538 20.439 2.86024 20.6349 3.12956 20.7716C3.39889 20.9083 3.69568 20.9821 3.99764 20.9876H19.9882C20.2967 20.9875 20.601 20.916 20.8772 20.7787C21.1535 20.6414 21.3942 20.442 21.5805 20.1961C21.7668 19.9502 21.8937 19.6646 21.9512 19.3615C22.0088 19.0584 21.9954 18.7461 21.9121 18.4491L19.3886 9.4944C19.2785 9.06806 19.0307 8.68999 18.6838 8.41892C18.3368 8.14784 17.91 7.99892 17.4697 7.99528H6.49617Z",
  weight1: "M11.9929 13.9917L15.9906 9.9941",
  weight2: "M3.33803 18.9888C2.46077 17.4695 1.99889 15.7461 1.99882 13.9917C1.99875 12.2373 2.4605 10.5138 3.33765 8.99447C4.2148 7.47512 5.47644 6.21343 6.99576 5.33622C8.51508 4.45901 10.2385 3.9972 11.9929 3.9972C13.7473 3.9972 15.4708 4.45901 16.9901 5.33622C18.5094 6.21343 19.771 7.47512 20.6482 8.99447C21.5253 10.5138 21.9871 12.2373 21.987 13.9917C21.987 15.7461 21.5251 17.4695 20.6478 18.9888",
  display1: "M15.9906 6.99587H3.99764C2.89372 6.99587 1.99882 7.89077 1.99882 8.99469V14.9912C1.99882 16.0951 2.89372 16.99 3.99764 16.99H15.9906C17.0945 16.99 17.9894 16.0951 17.9894 14.9912V8.99469C17.9894 7.89077 17.0945 6.99587 15.9906 6.99587Z",
  display2: "M21.987 10.9935V12.9923"
};

export function ProductHighlights() {
  const specs = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.motor} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "48V 250W Rear Hub BLDC Motor",
      description: "Powerful brushless motor for smooth acceleration and hill climbing"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.battery1} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.battery2} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "48V 15.6Ah Li-Ion Removable Battery",
      description: "Long range battery providing an unmatched single charge range."
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.weight1} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.weight2} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "High-Tensile Steel Frame",
      description: "5 years of Warranty, No questions asked!"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.display1} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.display2} stroke="#DFB001" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Cluster C9 Colour Display",
      description: "Segment’s best display, by a mile."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Product Image */}
      <div className="order-2 lg:order-1 relative">
        <div className="bg-white rounded-2xl p-8 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
          <img
            src="https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/landing+page/Comp+2.gif"
            alt="Viper E-Bike Details"
            className="w-full h-auto rounded-xl relative z-10 object-cover"
          />
          {/* Overlay Texture */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-overlay">
             <img src={imgOverlay} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Feature Box */}
        <div className="mt-6 bg-gradient-to-br from-[#1d1d1b] to-black p-6 rounded-xl border border-[#dfb001]/30 shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-10 h-10 bg-[#dfb001] rounded-lg flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(223,176,1,0.3)]">
              <svg className="w-6 h-6 text-[#1d1d1b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-['Poppins'] font-bold text-lg text-white mb-1">Advance Mono-Shock Suspension</h4>
              <p className="font-['Inter'] text-[#dfb001] text-sm font-medium">Best-in-class durability with upto 40mm travel.</p>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#dfb001]/10 rounded-full blur-2xl group-hover:bg-[#dfb001]/20 transition-all duration-500"></div>
        </div>
      </div>

      {/* Specs List */}
      <div className="flex flex-col gap-4 order-1 lg:order-2">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-[#dfb001]/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
              {spec.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-['Poppins'] font-semibold text-lg text-[#1d1d1b] leading-[28px]">
                {spec.title}
              </h3>
              <p className="font-['Inter'] font-normal text-[#4a5565] text-sm leading-[22.75px]">
                {spec.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
