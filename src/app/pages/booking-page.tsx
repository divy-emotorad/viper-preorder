import { useState, useEffect, use } from "react";
import { Header } from "../components/header";
import { ContactRMSection } from "../components/contact-rm-section";
import {
  LiveSellingCounter,
  LiveSellingCounterMobile,
} from "../components/live-selling-counter";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Minus,
  Plus,
  CreditCard,
  Building2,
  Shield,
  Lock,
  User,
  ArrowRight,
  Package,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useInventory } from "../context/inventory-context";
import viperImage from "../../assets/770e77c21b331603db955be2300f1c7fa0652347.png";
import axios from "axios";
import { Combobox } from "../components/ui/combobox";
import { color } from "motion/react";

interface DealerData {
  franchise_code: string;
  dealer_name: string;
  fr_id: string;
}

export function BookingPage() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [quantityBlack, setQuantityBlack] = useState(1);
  const [quantityBlue, setQuantityBlue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [selectedBank, setSelectedBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { availableUnits } = useInventory();
  const [bookingId, setBookingId] = useState("");
  const [discount, setDiscount] = useState(3000);
  const [selectedColor, setSelectedColor] = useState<
    "Stealth Black" | "Apex Blue"
  >("Stealth Black");

  const colors = [
    { name: "Stealth Black", hex: "#1d1d1b", displayColor: "#1d1d1b" },
    { name: "Apex Blue", hex: "#1e40af", displayColor: "#1e40af" },
  ];

  const unitPrice = 55999 - discount;
  const totalAmount = unitPrice * (quantityBlack + quantityBlue);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleQuantityChangeBlack = (delta: number) => {
    const newQuantity = quantityBlack + delta;
    if (newQuantity >= 0) {
      setQuantityBlack(newQuantity);
    }
  };

  const handleQuantityChangeBlue = (delta: number) => {
    const newQuantity = quantityBlue + delta;
    if (newQuantity >= 0) {
      setQuantityBlue(newQuantity);
    }
  };

  const [formData, setFormData] = useState({
    franchiseId: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).franchiseId
      : "",
    franchiseName: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).franchiseName
      : "",
    dealerName: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).dealerName
      : "",
    phone: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).phone
      : "",
    email: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).email
      : "",
    pincode: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).pincode
      : "",
    city: "",
    state: "",
    quantity: "",
    selectedColor: localStorage.getItem("bookingDetails")
      ? JSON.parse(localStorage.getItem("bookingDetails")).color
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [franchises, setFranchises] = useState([]);
  const [isLoadingFranchises, setIsLoadingFranchises] = useState(true);
  const [isLoadingPincode, setIsLoadingPincode] = useState(false);

  // Fetch franchise names from API
  useEffect(() => {
    const fetchWarrantyDealers = async () => {
      try {
        setIsLoadingFranchises(true);
        const warrantyResponse = await axios.get<DealerData[]>(
          "https://www.emotorad.com/api/oms/franchise?distributor=false",
        );

        if (warrantyResponse.data) {
          setFranchises(warrantyResponse.data);
        }
      } catch (error) {
        console.error("Error fetching dealers:", error);
        // Set empty array on error, user can still type manually
        setFranchises([]);
      } finally {
        setIsLoadingFranchises(false);
      }
    };

    fetchWarrantyDealers();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Fetch city and state from pincode
  useEffect(() => {
    if (formData.pincode.length === 6) {
      setIsLoadingPincode(true);
      axios
        .post(`https://www.emotorad.com/api/oms/pincode`, {
          pincode: formData.pincode,
        })
        .then((response) => {
          if (response.data?.data) {
            const city = response.data.data.district?.district_name || "";
            const state = response.data.data.state?.state_name || "";

            setFormData((prev) => ({
              ...prev,
              city,
              state,
            }));

            // Clear city and state validation errors if they exist
            setValidationErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.city;
              delete newErrors.state;
              return newErrors;
            });
          }
        })
        .catch((error) => {
          console.error("Pincode fetching error:", error);
          setError("Invalid pincode. Please check and try again.");

          // Clear city and state on error
          setFormData((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
        })
        .finally(() => {
          setIsLoadingPincode(false);
        });
    } else {
      // Clear city and state if pincode is incomplete
      if (formData.pincode.length > 0 && formData.pincode.length < 6) {
        setFormData((prev) => ({
          ...prev,
          city: "",
          state: "",
        }));
      }
    }
  }, [formData.pincode]);

  // Validation functions
  const validatePhone = (phone: string): boolean => {
    // Indian phone number: 10 digits starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.franchiseName.trim()) {
      errors.franchiseName = "Franchise name is required";
    } else if (formData.franchiseName.trim().length < 3) {
      errors.franchiseName = "Franchise name must be at least 3 characters";
    }

    if (!formData.dealerName.trim()) {
      errors.dealerName = "Your name is required";
    } else if (formData.dealerName.trim().length < 2) {
      errors.dealerName = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (
      formData.pincode.trim().length !== 6 ||
      !/^\d+$/.test(formData.pincode)
    ) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      errors.city = "City must be at least 2 characters";
    }

    if (!formData.state.trim()) {
      errors.state = "State is required";
    } else if (formData.state.trim().length < 2) {
      errors.state = "State must be at least 2 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number
    if (name === "phone") {
      // Only allow digits, limit to 10 digits
      const digitsOnly = value.replace(/\D/g, "");
      const limitedDigits = digitsOnly.slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        phone: limitedDigits,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value,
      }));
    }

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleComboboxChange = (value: string) => {
    setFormData((prev) => ({ ...prev, franchiseName: value }));
    const fr = franchises.find((f) => f.dealer_name === value);
    setFormData((prev) => ({
      ...prev,
      franchiseId: fr?.fr_id || "",
      dealerName: fr?.poc_name || "",
      pincode: fr?.pincode || "",
      email: fr?.email || "",
      phone: fr?.mobile || "",
    }));
    setDiscount(fr?.os > 0 ? 0 : 3000);
    console.log(fr);
    // Clear validation error
    if (validationErrors.franchiseName) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.franchiseName;
        return newErrors;
      });
    }
  };

  const handleProceedToPayment = async () => {
    if (!validateForm()) {
      return;
    }
    if (quantity > availableUnits) {
      toast.error(`Only ${availableUnits} units available`);
      return;
    }

    setIsProcessing(true);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const payload = {
        name: formData.franchiseName,
        email: formData.email,
        phoneNumber: formData.phone,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        amount: totalAmount,
        bikeInfo: {
          bikeName: "Viper",
          orderInfo: [
            { qty: quantityBlack, color: "Stealth Black" },
            {
              qty: quantityBlue,
              color: "Apex Blue",
            },
          ],
        },
        bookingId: "VPR" + Date.now(),
        dealerDetails: {
          dealerName: formData.dealerName,
          fr_id: formData.franchiseId,
        },
      };
      const res = await axios.post(
        "https://www.emotorad.com/api/payment/preorder/viper",
        payload,
        config,
      );
      if (!res.data.preorder.name) {
        toast.error(`Server error: order not created. Please try again.`);
        return;
      }
      // Store booking details
      localStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          quantity: quantityBlack+quantityBlue,
          totalAmount,
          bookingId: payload.bookingId,
          date: new Date().toISOString(),
          dealerName: formData.dealerName,
          franchiseName: formData.franchiseName,
          pincode: formData.pincode,
          email: formData.email,
          phone: formData.phone,
          franchiseId: formData.franchiseId,
          city: formData.city,
          state: formData.state,
          databaseId: res.data.preorder._id,
        }),
      );
      localStorage.removeItem("paymentTimerExpiry");
      navigate("/confirmation");
    } catch (error) {
      toast.error("Failed to process payment", error.message);
    }
    navigate(
      `/payment?id=${localStorage.getItem("bookingDetails") ? JSON.parse(localStorage.getItem("bookingDetails")).bookingId : ""}`,
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Live Selling Counter Popups */}
      <LiveSellingCounter />
      <LiveSellingCounterMobile />

      <main className="py-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#1d1d1b] mb-2">
              Complete Your Pre-Booking
            </h1>
            <p className="text-gray-600">
              Secure your Viper e-bike units with a simple payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Summary - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-xl text-[#1d1d1b] mb-4">
                  Booking Summary
                </h2>
                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
                  <div className="w-32 h-32 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      src={viperImage}
                      alt="Viper E-Bike"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#1d1d1b] mb-1">
                      EMotorad Viper
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Stealth Black</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Price per unit</p>
                        <p className="text-xl font-bold text-[#dfb001]">
                          ₹{unitPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Label className="text-sm text-gray-600">
                          Quantity:
                        </Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChangeBlack(-1)}
                            disabled={quantityBlack <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="text"
                            value={quantityBlack}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val >= 0) setQuantityBlack(val);
                            }}
                            className="w-16 text-center"
                            readOnly
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChangeBlack(1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-4 pt-4 border-t border-gray-200">
                      <Label className="text-sm text-gray-600 mb-3 block">
                        Select Color:
                      </Label>
                      <div className="flex gap-2">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() =>
                              setSelectedColor(
                                color.name as "Stealth Black" | "Apex Blue",
                              )
                            }
                            className={`flex-1 group relative rounded-xl border-2 transition-all overflow-hidden ${
                              selectedColor === color.name
                                ? "border-[#dfb001] shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="p-3 flex flex-col items-center gap-2">
                              <span
                                className={`text-xs font-semibold transition-colors ${
                                  selectedColor === color.name
                                    ? "text-[#dfb001]"
                                    : "text-gray-700"
                                }`}
                              >
                                {color.name}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-32 h-32 bg-black rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      src={viperImage}
                      alt="Viper E-Bike"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#1d1d1b] mb-1">
                      EMotorad Viper
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Apex Blue</p>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Price per unit</p>
                        <p className="text-xl font-bold text-[#dfb001]">
                          ₹{unitPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Label className="text-sm text-gray-600">
                          Quantity:
                        </Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChangeBlue(-1)}
                            disabled={quantityBlue <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="text"
                            value={quantityBlue}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val >= 0) setQuantityBlue(val);
                            }}
                            className="w-16 text-center"
                            readOnly
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChangeBlue(1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* <div className="mt-4 pt-4 border-t border-gray-200">
                      <Label className="text-sm text-gray-600 mb-3 block">
                        Select Color:
                      </Label>
                      <div className="flex gap-2">
                        {colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() =>
                              setSelectedColor(
                                color.name as "Stealth Black" | "Apex Blue",
                              )
                            }
                            className={`flex-1 group relative rounded-xl border-2 transition-all overflow-hidden ${
                              selectedColor === color.name
                                ? "border-[#dfb001] shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="p-3 flex flex-col items-center gap-2">
                              <span
                                className={`text-xs font-semibold transition-colors ${
                                  selectedColor === color.name
                                    ? "text-[#dfb001]"
                                    : "text-gray-700"
                                }`}
                              >
                                {color.name}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <form className="">
                {/* Business Information Section */}
                <div className="space-y-4 sm:space-y-6 mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfb001]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      Business Information
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="franchiseName"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        Franchise Name *
                      </Label>
                      <Combobox
                        id="franchiseName"
                        name="franchiseName"
                        value={formData.franchiseName}
                        onChange={(value) => {
                          handleComboboxChange(value);
                        }}
                        required
                        className="bg-white border-2 border-gray-300 focus:border-[#dfb001] text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                        options={franchises.map(
                          (dealer, index) => dealer.dealer_name,
                        )}
                        isLoading={isLoadingFranchises}
                      />
                      {validationErrors.franchiseName && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.franchiseName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-200">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#dfb001]" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Dealer Name */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="dealerName"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        Your Name *
                      </Label>
                      <Input
                        id="dealerName"
                        name="dealerName"
                        value={formData.dealerName}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Rajesh Kumar"
                        className="bg-white border-2 border-gray-300 focus:border-[#003D99] text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                      />
                      {validationErrors.dealerName && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.dealerName}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium text-sm sm:text-base pointer-events-none">
                          +91
                        </div>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="9876543210"
                          maxLength={10}
                          className="bg-white border-2 border-gray-300 focus:border-[#003D99] text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base pl-14"
                        />
                      </div>
                      {validationErrors.phone && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.phone}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Enter 10 digit number starting with 6, 7, 8, or 9
                      </p>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="dealer@example.com"
                        className="bg-white border-2 border-gray-300 focus:border-[#003D99] text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Pincode */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="pincode"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        Pincode *
                      </Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        type="text"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        maxLength={6}
                        placeholder="Enter 6-digit pincode"
                        className="bg-white border-2 border-gray-300 focus:border-[#003D99] text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base"
                      />
                      {validationErrors.pincode && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.pincode}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="city"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        City *
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        readOnly
                        placeholder=""
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base cursor-not-allowed"
                      />
                      {validationErrors.city && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.city}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="state"
                        className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2"
                      >
                        State *
                      </Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        readOnly
                        placeholder=""
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 h-11 sm:h-12 rounded-xl text-sm sm:text-base cursor-not-allowed"
                      />
                      {validationErrors.state && (
                        <p className="text-red-500 text-xs sm:text-sm">
                          {validationErrors.state}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-center text-xs sm:text-sm text-red-500">
                    {error}
                  </p>
                )}
              </form>
            </div>

            {/* Order Summary - Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
                <h2 className="font-semibold text-xl text-[#1d1d1b] mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per unit</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      ₹{unitPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {!discount && (
                    <div className="text-center">
                      <small className="text-red-500">
                        No discount applicable on unit price with 90+OS
                      </small>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      {quantityBlack + quantityBlue} unit(s)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#1d1d1b]">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold text-[#dfb001]">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className=" gap-4 p-4 rounded-xl border-2 border-[#dfb001] bg-[#dfb001]/5 mb-6">
                  <p className="text-sm font-semibold text-[#1d1d1b] mb-1">
                    Bank Transfer (NEFT/RTGS)
                  </p>
                  <p className="text-sm text-gray-600">
                    Transfer the amount directly to our bank account. You'll
                    receive our bank details on the next page.
                  </p>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  disabled={
                    !(
                      formData.franchiseName &&
                      formData.dealerName &&
                      formData.phone &&
                      formData.email &&
                      formData.pincode &&
                      formData.city &&
                      formData.state &&
                      quantityBlack + quantityBlue >= 1
                    )
                  }
                  className="w-full bg-[#dfb001] hover:bg-[#c99e00] text-[#1d1d1b] py-6 shadow-lg hover:shadow-xl transition-all font-bold"
                  size="lg"
                >
                  Proceed to Payment
                </Button>

                <div className="mt-6 bg-[#fafafa] rounded-xl p-4">
                  <p className="text-xs text-gray-600 text-center">
                    By proceeding, you agree to our{" "}
                    <span className="text-[#dfb001] hover:underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-[#dfb001] hover:underline">
                      Privacy Policy
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ContactRMSection />
    </div>
  );
}
