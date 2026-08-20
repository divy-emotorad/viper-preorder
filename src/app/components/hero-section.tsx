import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { LiveSellingCounter } from "./live-selling-counter";
import img221 from "../../assets/d72eb52972174090143369260b265678ed408dd3.png";
import viperLogo from "../../assets/28cbcb73e127db22c133548b83c84284d2e176f3.png";

const svgPaths = {
  p1ab85e00:
    "M9.99267 18.3199C14.5917 18.3199 18.3199 14.5917 18.3199 9.99267C18.3199 5.39367 14.5917 1.66545 9.99267 1.66545C5.39367 1.66545 1.66545 5.39367 1.66545 9.99267C1.66545 14.5917 5.39367 18.3199 9.99267 18.3199Z",
  p157a4b40: "M9.99267 4.99634V9.99267L13.3236 11.6581",
  clockCircle:
    "M18.2489 34.8983C27.4442 34.8983 34.8983 27.4442 34.8983 18.2489C34.8983 9.05369 27.4442 1.59951 18.2489 1.59951C9.05369 1.59951 1.59951 9.05369 1.59951 18.2489C1.59951 27.4442 9.05369 34.8983 18.2489 34.8983Z",
  clockHand: "M1.59951 1.59951V11.5891L8.25935 14.919",
};

export function HeroSection() {
  const navigate = useNavigate();

  const handlePreBook = () => {
    navigate("/booking");
  };

  return (
    <div className="relative w-full min-h-[75vh] lg:min-h-screen overflow-x-hidden font-sans text-white">
      {/* Desktop Video (> 768px) */}
      <video
        src="https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/landing+page/viper+(1).mp4"
        autoPlay
        muted
        loop
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Mobile Video (<= 768px) */}
      <video
        src="https://ar-euro.s3.ap-south-1.amazonaws.com/india-webiste-17-02-24/landing+page/viper+598.87x1138.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="block md:hidden absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 pb-20 relative z-10">
        {/* Hero Headlines */}
        <div className="text-center relative z-10 mb-12">
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <h1 className="font-bold leading-tight tracking-tight text-white text-center text-[32px]">
              Pre-Book the All-New
            </h1>
            <img
              src={viperLogo}
              alt="Viper"
              className="h-[30px] md:h-[48px] w-auto object-contain"
            />
          </div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-normal text-[#ffffff]">
            High-performance e-bike built for the future.
          </p>

          {/* Live Sales Widget - Static Position */}
          {/* <div className="hidden md:flex mt-8 justify-center mb-8 relative z-20">
            <LiveSellingCounter />
          </div> */}
        </div>

        {/* Layout Grid: Cards Left, Bike Center/Right */}
        <div className="relative w-full max-w-6xl mx-auto mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pricing, Button, Deadline */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:flex lg:flex-col gap-3 lg:gap-6 lg:pt-20 z-20 order-2 lg:order-1 relative w-full mt-10 lg:mt-0 -ml-2 lg:ml-0">
            {/* Pricing Card (Container4) */}
            <div className="order-1 col-span-1 bg-white rounded-2xl p-3 lg:p-6 shadow-2xl border border-[#dfb001]/20 relative w-full h-full lg:h-auto lg:max-w-[320px] lg:mx-0 flex flex-col justify-center">
              <p className="text-gray-500 text-[10px] lg:text-sm mb-1">
                Pre-Booking Price
              </p>
              <div className="flex flex-col mb-1 lg:mb-4">
                {/* <span className="text-gray-400 text-sm lg:text-2xl font-bold line-through">
                  ₹55,499
                </span> */}
                <span className="text-[#1d1d1b] text-xl lg:text-4xl font-bold">
                  ₹55,499
                </span>
              </div>
              {/* <div className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2">
                <span className="bg-[#dfb001]/20 text-[#7a6000] text-[10px] lg:text-xs font-bold px-1.5 py-0.5 lg:px-2 lg:py-1 rounded">
                  Save ₹2,500
                </span>
                <span className="text-gray-500 text-[9px] lg:text-xs whitespace-nowrap">
                  Exclusive dealer rate
                </span>
              </div> */}
            </div>

            <div className="flex flex-col gap-0.5 lg:gap-[7px] hidden lg:block">
              <p className="text-[#dfb001] font-semibold leading-tight lg:leading-[16px] tracking-[0.6px] uppercase font-sans text-[13px]">
                Pre-booking Deadline
              </p>
              <p className="text-white font-bold leading-tight lg:leading-[20px] font-sans text-[13px]">
                Until Stock Lasts
              </p>
            </div>

            {/* Deadline Card (Container2) */}
            <div className="order-2 lg:order-3 col-span-1 w-full lg:max-w-[320px] lg:mx-0 bg-[#1d1d1b] border border-[#dfb001]/40 rounded-[14px] shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-center p-3 lg:px-4 lg:py-0 relative lg:mt-32 h-auto min-h-[100px] lg:h-[107px] gap-2 lg:gap-[13px] lg:hidden">
              <div className="w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] relative shrink-0">
                <div className="absolute inset-[8.33%]">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 36.4978 36.4978"
                    fill="none"
                  >
                    <path
                      d={svgPaths.clockCircle}
                      stroke="#DFB001"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="absolute top-[27%] left-[50%] w-[7px] h-[12px] -translate-x-1/2">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 9.85922 16.5189"
                    fill="none"
                    style={{ overflow: "visible" }}
                  >
                    <path
                      d={svgPaths.clockHand}
                      stroke="#DFB001"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 lg:gap-[7px]">
                <p className="text-[#dfb001] font-semibold leading-tight lg:leading-[16px] tracking-[0.6px] uppercase font-sans text-[13px]">
                  Pre-booking Deadline
                </p>
                <p className="text-white font-bold leading-tight lg:leading-[20px] font-sans text-[13px]">
                  Until Stock Lasts
                </p>
              </div>
            </div>

            {/* Pre-Book Button (Button1) */}
            <button
              onClick={handlePreBook}
              className="order-3 lg:order-2 col-span-2 w-full lg:max-w-[320px] lg:mx-0 bg-[#dfb001] hover:bg-[#c99e00] text-[#1d1d1b] font-medium text-base lg:text-lg py-3 lg:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2 lg:mt-0"
            >
              Pre-order
            </button>
          </div>

          {/* Right Column: Bike Image & Floating Tags */}
          <div className="lg:col-span-8 relative min-h-[400px] lg:min-h-[600px] flex justify-center items-center order-1 lg:order-2">
            {/* Bike Image */}
            <div className="relative z-10 w-full max-w-[800px]">
              {/* Tags overlaid on/near image */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
