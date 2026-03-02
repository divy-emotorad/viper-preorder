import React from "react";

const svgPaths = {
  p12713400: "M23.322 15.1593C23.322 20.9898 19.2406 23.905 14.3896 25.5958C14.1356 25.6819 13.8597 25.6778 13.6084 25.5842C8.74573 23.905 4.66439 20.9898 4.66439 15.1593V6.99659C4.66439 6.68732 4.78725 6.39072 5.00593 6.17203C5.22462 5.95335 5.52122 5.83049 5.83049 5.83049C8.16269 5.83049 11.0779 4.43117 13.1069 2.6587C13.354 2.44764 13.6682 2.33167 13.9932 2.33167C14.3181 2.33167 14.6324 2.44764 14.8794 2.6587C16.9201 4.44283 19.8237 5.83049 22.1559 5.83049C22.4651 5.83049 22.7617 5.95335 22.9804 6.17203C23.1991 6.39072 23.322 6.68732 23.322 6.99659V15.1593Z",
  p18997d00: "M11.9929 19.9882C14.1134 19.9882 16.147 19.1458 17.6464 17.6464C19.1458 16.147 19.9882 14.1134 19.9882 11.9929C19.9882 9.87244 19.1458 7.83881 17.6464 6.3394C16.147 4.84 14.1134 3.99764 11.9929 3.99764C9.87244 3.99764 7.83881 4.84 6.3394 6.3394C4.84 7.83881 3.99764 9.87244 3.99764 11.9929C3.99764 14.1134 4.84 16.147 6.3394 17.6464C7.83881 19.1458 9.87244 19.9882 11.9929 19.9882Z",
  p1ea55ba0: "M4.66439 16.3254C4.44373 16.3261 4.22737 16.2642 4.04047 16.1469C3.85358 16.0296 3.7038 15.8617 3.60855 15.6626C3.5133 15.4636 3.47648 15.2416 3.50237 15.0224C3.52827 14.8033 3.61581 14.596 3.75484 14.4246L15.2992 2.53043C15.3858 2.43048 15.5038 2.36293 15.6339 2.33888C15.7639 2.31483 15.8983 2.33571 16.0149 2.39808C16.1315 2.46046 16.2234 2.56063 16.2756 2.68215C16.3278 2.80367 16.3371 2.93932 16.302 3.06684L14.0631 10.0867C13.9971 10.2634 13.975 10.4535 13.9985 10.6407C14.0221 10.8278 14.0907 11.0064 14.1985 11.1612C14.3063 11.316 14.45 11.4424 14.6174 11.5294C14.7847 11.6164 14.9707 11.6616 15.1593 11.661H23.322C23.5426 11.6602 23.759 11.7221 23.9459 11.8394C24.1328 11.9567 24.2826 12.1247 24.3778 12.3237C24.4731 12.5228 24.5099 12.7448 24.484 12.9639C24.4581 13.1831 24.3705 13.3904 24.2315 13.5617L12.6871 25.4559C12.6005 25.5559 12.4825 25.6234 12.3525 25.6475C12.2225 25.6715 12.0881 25.6506 11.9715 25.5883C11.8549 25.5259 11.7629 25.4257 11.7107 25.3042C11.6585 25.1827 11.6492 25.047 11.6843 24.9195L13.9232 17.8996C13.9892 17.7229 14.0114 17.5328 13.9878 17.3457C13.9642 17.1586 13.8956 16.9799 13.7878 16.8251C13.6801 16.6703 13.5363 16.544 13.369 16.457C13.2017 16.3699 13.0157 16.3248 12.8271 16.3254H4.66439Z",
  p1fa70d80: "M10.9935 10.2639L6.99587 3.33803",
  p21e3db00: "M18.6576 8.16269H4.66439C3.37636 8.16269 2.3322 9.20684 2.3322 10.4949V17.4915C2.3322 18.7795 3.37636 19.8237 4.66439 19.8237H18.6576C19.9456 19.8237 20.9898 18.7795 20.9898 17.4915V10.4949C20.9898 9.20684 19.9456 8.16269 18.6576 8.16269Z",
  p2333ec00: "M3.33803 6.99587L5.06701 7.99528",
  p32900f0: "M15.9906 6.99587H3.99764C2.89372 6.99587 1.99882 7.89077 1.99882 8.99469V14.9912C1.99882 16.0951 2.89372 16.99 3.99764 16.99H15.9906C17.0945 16.99 17.9894 16.0951 17.9894 14.9912V8.99469C17.9894 7.89077 17.0945 6.99587 15.9906 6.99587Z",
  p348e7840: "M16.99 20.6478L15.9906 18.9188",
  p35af0e00: "M16.99 3.33803L15.9906 5.06701",
  p3ba9e180: "M19.9882 12.9923C19.9882 17.9894 16.4903 20.4879 12.3327 21.9371C12.115 22.0108 11.8785 22.0073 11.6631 21.9271C7.49558 20.4879 3.99764 17.9894 3.99764 12.9923V5.99646C3.99764 5.7314 4.10294 5.4772 4.29036 5.28977C4.47779 5.10235 4.73199 4.99705 4.99705 4.99705C6.99587 4.99705 9.4944 3.79776 11.2334 2.27866C11.4451 2.09776 11.7144 1.99837 11.9929 1.99837C12.2714 1.99837 12.5407 2.09776 12.7525 2.27866C14.5014 3.80775 16.99 4.99705 18.9888 4.99705C19.2539 4.99705 19.5081 5.10235 19.6955 5.28977C19.8829 5.4772 19.9882 5.7314 19.9882 5.99646V12.9923Z",
  p3d154012: "M20.6478 6.99587L18.9188 7.99528",
  p3e361750: "M10.9935 13.7219L6.99587 20.6478",
  p3f476680: "M11.9929 13.9917C12.523 13.9917 13.0315 13.7812 13.4063 13.4063C13.7812 13.0315 13.9917 12.523 13.9917 11.9929C13.9917 11.4628 13.7812 10.9544 13.4063 10.5795C13.0315 10.2047 12.523 9.9941 11.9929 9.9941C11.4628 9.9941 10.9544 10.2047 10.5795 10.5795C10.2047 10.9544 9.9941 11.4628 9.9941 11.9929C9.9941 12.523 10.2047 13.0315 10.5795 13.4063C10.9544 13.7812 11.4628 13.9917 11.9929 13.9917Z",
  p5f35770: "M7.4945 9.99267L9.15995 11.6581L12.4908 8.32723M17.4872 9.99267C17.4872 10.9769 17.2933 11.9514 16.9167 12.8607C16.5401 13.77 15.988 14.5962 15.2921 15.2921C14.5962 15.988 13.77 16.5401 12.8607 16.9167C11.9514 17.2933 10.9769 17.4872 9.99267 17.4872C9.00848 17.4872 8.03392 17.2933 7.12465 16.9167C6.21537 16.5401 5.38919 15.988 4.69326 15.2921C3.99733 14.5962 3.44529 13.77 3.06865 12.8607C2.69202 11.9514 2.49817 10.9769 2.49817 9.99267C2.49817 8.00501 3.28777 6.09875 4.69326 4.69326C6.09875 3.28777 8.00501 2.49817 9.99267 2.49817C11.9803 2.49817 13.8866 3.28777 15.2921 4.69326C16.6976 6.09875 17.4872 8.00501 17.4872 9.99267Z",
  p8b96700: "M20.6478 16.99L18.9188 15.9906",
  p9a0c070: "M3.99764 13.9917C3.80852 13.9924 3.62309 13.9394 3.46291 13.8388C3.30273 13.7383 3.17436 13.5943 3.09273 13.4237C3.01109 13.2531 2.97954 13.0629 3.00173 12.8751C3.02392 12.6872 3.09895 12.5096 3.2181 12.3627L13.1123 2.16872C13.1865 2.08305 13.2876 2.02516 13.3991 2.00455C13.5105 1.98394 13.6257 2.00183 13.7256 2.05529C13.8256 2.10875 13.9044 2.1946 13.9491 2.29875C13.9938 2.4029 14.0018 2.51916 13.9718 2.62845L12.0529 8.6449C11.9963 8.79633 11.9773 8.95923 11.9975 9.11963C12.0177 9.28002 12.0765 9.43311 12.1689 9.56578C12.2613 9.69845 12.3845 9.80673 12.5279 9.88133C12.6713 9.95593 12.8307 9.99463 12.9923 9.9941H19.9882C20.1773 9.99346 20.3628 10.0465 20.5229 10.147C20.6831 10.2476 20.8115 10.3915 20.8931 10.5621C20.9748 10.7327 21.0063 10.923 20.9841 11.1108C20.9619 11.2986 20.8869 11.4763 20.7677 11.6231L10.8736 21.8171C10.7994 21.9028 10.6982 21.9607 10.5868 21.9813C10.4753 22.0019 10.3602 21.984 10.2602 21.9306C10.1603 21.8771 10.0815 21.7912 10.0367 21.6871C9.99202 21.5829 9.98403 21.4667 10.0141 21.3574L11.933 15.3409C11.9895 15.1895 12.0085 15.0266 11.9883 14.8662C11.9681 14.7058 11.9093 14.5527 11.8169 14.4201C11.7246 14.2874 11.6014 14.1791 11.458 14.1045C11.3145 14.0299 11.1552 13.9912 10.9935 13.9917H3.99764Z",
  p31827340: "M3.33803 16.99L5.06701 15.9906",
};

interface SpecItem {
  label: string;
  value: string;
}

interface SpecCategory {
  title: string;
  icon: React.ReactNode;
  specs: SpecItem[];
}

export function Specifications() {
  const specCategories: SpecCategory[] = [
    {
      title: "Mechanical",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.p18997d00} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3f476680} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.9929 1.99882V3.99764" stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.9929 21.987V19.9882" stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p348e7840} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1fa70d80} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p8b96700} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2333ec00} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.9917 11.9929H21.987" stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.99882 11.9929H3.99764" stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3d154012} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31827340} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p35af0e00} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3e361750} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      specs: [
        { label: "Frame", value: "High Tensile Steel Frame" },
        { label: "Tyre", value: '20" x 4.0" Nylon Tyres' },
        { label: "Front Fork", value: "Double Crown 100mm Travel" },
        { label: "Brakes", value: "Hydraulic disc brakes with auto cut off and 160mm Rotor" },
        { label: "Rim", value: "Double Wall Aluminium Alloy Rims" },
        { label: "Front Wheel", value: "Aluminium Alloy, 36H Hub" },
        { label: "Drivetrain", value: "Shimano Tourney TY200 - 7 Speed" },
        { label: "Seat Height", value: "820MM" },
        { label: "Handlebar", value: "31.8mm*680 mm Handelbar" },
      ],
    },
    {
      title: "Electronics",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.p9a0c070} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      specs: [
        { label: "Motor", value: "EMotorad 48V 250W Rear Hub Motor" },
        { label: "Battery", value: "48V 15.6Ah (750) Li-Ion Removable Battery" },
        { label: "Display", value: "Cluster C9 Colour Display" },
        { label: "Pedal Assist", value: "5 Levels of Pedal Assist" },
        { label: "E-brakes", value: "Auto Cut-off E-Brakes" },
        { label: "Light", value: "Front and Rear Light with Integrated horn" },
        { label: "Charger", value: "2A Fast Charger" },
        { label: "Charging Time", value: "5 Hrs" },
        { label: "Range", value: "105 kms" },
      ],
    },
    {
      title: "Warranty",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.p3ba9e180} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      specs: [
        { label: "Frame", value: "5 years" },
        { label: "Motor", value: "2 years" },
        { label: "Hub motor, Controller", value: "1 year" },
        { label: "Electronic handlebar controls and electrical connections, Battery Charger", value: "6 Months" },
        { label: "Paintwork (excluding accidental or deliberate damage)", value: "1 year" },
        { label: "Lights and lighting system", value: "6 Months" },
        { label: "Battery", value: "2 years" },
      ],
    },
    {
      title: "General",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d={svgPaths.p32900f0} stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21.987 10.9935V12.9923" stroke="#1D1D1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      specs: [
        { label: "Max Weight Capacity", value: "upto 110KG" },
        { label: "Rider Height", value: '5\'2" ft. & above' },
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Poppins'] font-bold text-[#1d1d1b] mb-4">
            <span className="text-[#dfb001]">Technical Specifications</span>
          </h2>
          <p className="text-base md:text-lg font-['Inter'] text-[#4a5565] max-w-2xl mx-auto">
            Professional-grade e-bike engineered for performance, reliability, and dealer confidence
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {specCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#fafafa] to-white rounded-[16px] border border-[#f3f4f6] overflow-hidden"
            >
              {/* Category Header */}
              <div
                className="px-6 py-5 flex items-center gap-3"
                style={{
                  backgroundImage: "linear-gradient(171.039deg, rgb(223, 176, 1) 0%, rgb(201, 158, 0) 100%)",
                }}
              >
                <div className="w-12 h-12 bg-[#1d1d1b]/10 rounded-[10px] flex items-center justify-center flex-shrink-0">
                  {category.icon}
                </div>
                <h3 className="text-xl font-['Poppins'] font-bold text-[#1d1d1b]">
                  {category.title}
                </h3>
              </div>

              {/* Specs List */}
              <div className="p-6">
                <div className="space-y-4">
                  {category.specs.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 pb-4 border-b border-[#e5e7eb] last:border-0 last:pb-0"
                    >
                      <dt className="text-sm font-['Inter'] font-semibold text-[#1d1d1b]/70 sm:w-1/2 lg:w-2/5 flex-shrink-0">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-['Inter'] font-medium text-[#1d1d1b] sm:w-1/2 lg:w-3/5">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 bg-gradient-to-b from-[#1d1d1b] to-black rounded-[16px] p-8 border border-[#dfb001]/30">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-[56px] h-[56px] bg-[#dfb001]/20 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-[#dfb001]" viewBox="0 0 28 28" fill="none">
                  <path d={svgPaths.p12713400} stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-left ">
                <p className="text-white font-['Inter'] font-bold leading-7 text-[15px]">Advanced Monoshock Suspension</p>
                <p className="text-white/80 font-['Inter'] leading-5 text-[13px]">Heavy Duty Shock Absorber</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#dfb001]/30" />
            <div className="flex items-center gap-3">
              <div className="w-[56px] h-[56px] bg-[#dfb001]/20 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-[#dfb001]" viewBox="0 0 28 28" fill="none">
                  <path d={svgPaths.p1ea55ba0} stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-left ">
                <p className="text-white font-['Inter'] font-bold leading-7 text-[16px]">Premium Components</p>
                <p className="text-white/80 font-['Inter'] leading-5 text-[13px]">Shimano & Patented EMotorad Tech</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[#dfb001]/30" />
            <div className="flex items-center gap-3">
              <div className="w-[56px] h-[56px] bg-[#dfb001]/20 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-[#dfb001]" viewBox="0 0 28 28" fill="none">
                  <path d={svgPaths.p21e3db00} stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M25.6542 12.8271V15.1593" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-left ">
                <p className="text-white font-['Inter'] font-bold leading-7 text-[16px]">Long Warranty</p>
                <p className="text-white/80 font-['Inter'] leading-5 text-[13px]">Strong 15.6Ah Battery with a 250W Rear Hub Motor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Spec Sheet CTA */}
        <div className="mt-10">
          <div className="bg-gradient-to-b from-[rgba(223,176,1,0.05)] to-transparent rounded-[16px] p-8 border border-[#dfb001] text-center">
            <h3 className="font-['Poppins'] font-bold text-xl text-[#1d1d1b] mb-2 leading-7">
              Get Complete Specifications Sheet
            </h3>
            <p className="font-['Inter'] font-normal text-[#4a5565] text-base mb-4 leading-6">
              Detailed technical specifications will be shared exclusively with dealers who pre-book
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#dfb001] font-bold font-['Inter']">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p5f35770} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Pre-book now to receive the full spec sheet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
