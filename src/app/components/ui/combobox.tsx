import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "./input";

interface ComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  isLoading?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Search",
  className = "",
  id,
  name,
  required = false,
  isLoading = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync search term with external value changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // If user didn't select from dropdown, keep the typed value
        if (searchTerm !== value) {
          onChange(searchTerm);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchTerm, value, onChange]);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Only show dropdown if user has typed at least 2 characters and there are matches
  const shouldShowDropdown =
    isOpen && searchTerm.length >= 1 && filteredOptions.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);

    // Only open dropdown if user has typed at least 2 characters
    if (newValue.length >= 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (option: string) => {
    setSearchTerm(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Input
          id={id}
          name={name}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={isLoading ? "Loading franchises..." : placeholder}
          className={className}
          required={required}
          autoComplete="off"
          disabled={isLoading}
        />
        {isLoading ? (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
        ) : (
          <ChevronDown
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${
              shouldShowDropdown ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {shouldShowDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectOption(option)}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                value === option ? "bg-blue-50" : ""
              }`}
            >
              <span className="text-sm text-gray-900">{option}</span>
              {value === option && <Check className="w-4 h-4 text-[#003D99]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
