import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useInventory } from "../context/inventory-context";
import logoImg from "../../assets/3504b60ac21a730328ba9e2719db813636c24fdd.png";

export function Header() {
  const navigate = useNavigate();
  const { availableUnits } = useInventory();

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[60px] flex items-center relative">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Centered Logo */}
          <a className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" href="/">
            <img 
              src={logoImg} 
              alt="EMotorad" 
              className="h-[78px] md:h-[94px] w-auto object-contain"
            />
          </a>
        </div>
      </header>
    </>
  );
}
