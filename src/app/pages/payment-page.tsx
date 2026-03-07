import { useState, useEffect, use } from "react";
import { Header } from "../components/header";
import { ContactRMSection } from "../components/contact-rm-section";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Building2, Copy, CheckCircle2, Lock, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { useInventory } from "../context/inventory-context";
import axios from "axios";

export function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [utrNumber, setUtrNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bookingData = JSON.parse(
    localStorage.getItem("bookingDetails") || "null",
  );

  // Check booking data separately without causing redirect loop
  if (bookingData.paymentStatus) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold text-[#1d1d1b] mb-4">
            Payment Already Processed
          </h2>
          <p className="text-gray-600 mb-6">
            Please start new booking if you want to purchase another unit.
          </p>
          <Button
            onClick={() => navigate("/booking")}
            className="bg-[#dfb001] hover:bg-[#c99e00] text-[#1d1d1b]"
          >
            Go to Booking Page
          </Button>
        </div>
      </div>
    );
  } else if (
    !bookingData ||
    !bookingData.quantity ||
    !bookingData.totalAmount ||
    !bookingData.bookingId ||
    !bookingData.databaseId
  ) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold text-[#1d1d1b] mb-4">
            Invalid Booking Data
          </h2>
          <p className="text-gray-600 mb-6">
            Please start from the booking page
          </p>
          <Button
            onClick={() => navigate("/booking")}
            className="bg-[#dfb001] hover:bg-[#c99e00] text-[#1d1d1b]"
          >
            Go to Booking Page
          </Button>
        </div>
      </div>
    );
  }

  const bankDetails = {
    accountName: "INKODOP TECHNOLOGIES PRIVATE LIMITED",
    accountNumber: "336305500250",
    ifscCode: "ICIC0003363",
    bankName: "ICICI Bank",
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmitUTR = async () => {
    if (!utrNumber.trim()) {
      toast.error("Please enter UTR/Reference number");
      return;
    }

    if (utrNumber.trim().length < 8) {
      toast.error("Please enter a valid UTR/Reference number");
      return;
    }
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post(
        `https://www.emotorad.com/api/payment/preorder/viper?id=${bookingData.databaseId}`,
        {
          utrNumber: utrNumber.trim(),
        },
        config,
      );
      if (!res.data.preorder) {
        toast.error(`Server error: order not created. Please try again.`);
        return;
      }
      localStorage.setItem(
        "bookingDetails",
        JSON.stringify({
          ...bookingData,
          paymentStatus: true,
          utrNumber: utrNumber.trim(),
        }),
      );
      localStorage.removeItem("paymentTimerExpiry");
      navigate("/confirmation");
    } catch (error) {
      toast.error("Failed to process payment", error.message);
    }
  };
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  // Timer management
  useEffect(() => {
    const TIMER_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
    const TIMER_KEY = "paymentTimerExpiry";

    // Initialize or retrieve timer
    let expiryTime = localStorage.getItem(TIMER_KEY);

    if (!expiryTime) {
      // Create new timer
      const newExpiryTime = Date.now() + TIMER_DURATION;
      localStorage.setItem(TIMER_KEY, newExpiryTime.toString());
      expiryTime = newExpiryTime.toString();
    }

    const updateTimer = () => {
      const now = Date.now();
      const remaining = parseInt(expiryTime!) - now;

      if (remaining <= 0) {
        // Timer expired
        setIsExpired(true);
        setTimeLeft(0);
        localStorage.removeItem(TIMER_KEY);
        localStorage.removeItem("bookingDetails");
        setTimeout(() => {
          navigate("/booking");
        }, 3000);
      } else {
        setTimeLeft(Math.floor(remaining / 1000)); // Convert to seconds
      }
    };

    // Initial update
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="py-12">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1d1d1b] mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">
              Transfer the amount via NEFT/RTGS to the bank details below
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bank Details - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Instructions */}
              {/* <div className="bg-gradient-to-r from-[#dfb001]/10 to-transparent border border-[#dfb001] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#1d1d1b] mb-2">
                      Payment Instructions
                    </h3>
                    <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                      <li>
                        Transfer ₹
                        {bookingData.totalAmount.toLocaleString("en-IN")} to the
                        bank account below
                      </li>
                      <li>Use NEFT or RTGS from your bank account</li>
                      <li>
                        Save the UTR/Transaction Reference number from your bank
                      </li>
                      <li>
                        Enter the UTR number in the form below to complete
                        booking
                      </li>
                    </ol>
                  </div>
                </div>
              </div> */}

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 md:hidden">
                <div
                  className={`mb-6 p-4 rounded-xl border-2 ${
                    timeLeft <= 300
                      ? "bg-red-50 border-red-500"
                      : "bg-[#dfb001]/10 border-[#dfb001]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock
                        className={`w-5 h-5 ${timeLeft <= 300 ? "text-red-600" : "text-[#dfb001]"}`}
                      />
                      <span
                        className={`text-sm font-semibold ${timeLeft <= 300 ? "text-red-900" : "text-[#1d1d1b]"}`}
                      >
                        {timeLeft <= 300 ? "Hurry Up!" : "Time Remaining"}
                      </span>
                    </div>
                    <div
                      className={`text-2xl font-bold ${timeLeft <= 300 ? "text-red-600 animate-pulse" : "text-[#dfb001]"}`}
                    >
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <p
                    className={`text-xs mt-2 ${timeLeft <= 300 ? "text-red-700" : "text-gray-600"}`}
                  >
                    {timeLeft <= 300
                      ? "Complete payment before time expires"
                      : "Complete your payment within this time"}
                  </p>
                </div>{" "}
                <h2 className="font-semibold text-xl text-[#1d1d1b] mb-4">
                  Payment Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      EMotorad Viper
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      {bookingData.quantity} unit(s)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      NEFT/RTGS
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#1d1d1b]">
                        Amount to Transfer
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-[#dfb001]">
                          ₹{bookingData.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#fafafa] rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-2 mb-3">
                    <Lock className="w-4 h-4 text-[#dfb001] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#1d1d1b] mb-1">
                        Secure Transaction
                      </p>
                      <p className="text-xs text-gray-600">
                        Your payment will be verified within 24 hours of
                        receiving the UTR number
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> Please ensure you transfer the exact
                    amount shown above. Keep the transaction receipt for your
                    records.
                  </p>
                </div>
              </div>

              {/* Bank Details Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-xl text-[#1d1d1b] mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#dfb001]" />
                  Bank Account Details
                </h2>

                <div className="space-y-4">
                  {/* Account Name */}
                  <div className="bg-[#fafafa] rounded-xl p-4 border border-gray-200">
                    <Label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                      Account Name
                    </Label>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#1d1d1b]">
                        {bankDetails.accountName}
                      </p>
                      <button
                        onClick={() =>
                          handleCopy(bankDetails.accountName, "Account Name")
                        }
                        className="text-[#dfb001] hover:text-[#c99e00] transition flex items-center gap-1 text-sm"
                      >
                        {copiedField === "Account Name" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Number */}
                  <div className="bg-[#fafafa] rounded-xl p-4 border border-gray-200">
                    <Label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                      Account Number
                    </Label>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#1d1d1b] tracking-wider">
                        {bankDetails.accountNumber}
                      </p>
                      <button
                        onClick={() =>
                          handleCopy(
                            bankDetails.accountNumber,
                            "Account Number",
                          )
                        }
                        className="text-[#dfb001] hover:text-[#c99e00] transition flex items-center gap-1 text-sm"
                      >
                        {copiedField === "Account Number" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* IFSC Code */}
                  <div className="bg-[#fafafa] rounded-xl p-4 border border-gray-200">
                    <Label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                      IFSC Code
                    </Label>
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#1d1d1b] tracking-wider">
                        {bankDetails.ifscCode}
                      </p>
                      <button
                        onClick={() =>
                          handleCopy(bankDetails.ifscCode, "IFSC Code")
                        }
                        className="text-[#dfb001] hover:text-[#c99e00] transition flex items-center gap-1 text-sm"
                      >
                        {copiedField === "IFSC Code" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bank Name & Branch */}
                  <div className="grid gap-4">
                    <div className="bg-[#fafafa] rounded-xl p-4 border border-gray-200">
                      <Label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">
                        Bank Name
                      </Label>
                      <p className="font-semibold text-[#1d1d1b]">
                        {bankDetails.bankName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* UTR Input Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-xl text-[#1d1d1b] mb-4">
                  Enter UTR/Reference Number
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  After making the NEFT/RTGS transfer, you will receive a UTR
                  (Unique Transaction Reference) or Reference number from your
                  bank. Enter it below to confirm your booking.
                </p>

                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="utr"
                      className="text-sm font-semibold text-[#1d1d1b] mb-2 block"
                    >
                      UTR/Transaction Reference Number *
                    </Label>
                    <Input
                      id="utr"
                      type="text"
                      placeholder="e.g., ICICN21060800001"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="py-6"
                      maxLength={30}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      This number is usually 12-22 characters long
                    </p>
                  </div>

                  <Button
                    onClick={handleSubmitUTR}
                    disabled={!utrNumber.trim() || utrNumber.trim().length < 8}
                    className="w-full bg-[#dfb001] hover:bg-[#c99e00] text-[#1d1d1b] text-lg py-6 shadow-lg hover:shadow-xl transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    Confirm Booking
                  </Button>
                  {error && (
                    <p className="text-center text-xs sm:text-sm text-red-500">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Summary - Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24 md:block hidden">
                <div
                  className={`mb-6 p-4 rounded-xl border-2 ${
                    timeLeft <= 300
                      ? "bg-red-50 border-red-500"
                      : "bg-[#dfb001]/10 border-[#dfb001]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock
                        className={`w-5 h-5 ${timeLeft <= 300 ? "text-red-600" : "text-[#dfb001]"}`}
                      />
                      <span
                        className={`text-sm font-semibold ${timeLeft <= 300 ? "text-red-900" : "text-[#1d1d1b]"}`}
                      >
                        {timeLeft <= 300 ? "Hurry Up!" : "Time Remaining"}
                      </span>
                    </div>
                    <div
                      className={`text-2xl font-bold ${timeLeft <= 300 ? "text-red-600 animate-pulse" : "text-[#dfb001]"}`}
                    >
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <p
                    className={`text-xs mt-2 ${timeLeft <= 300 ? "text-red-700" : "text-gray-600"}`}
                  >
                    {timeLeft <= 300
                      ? "Complete payment before time expires"
                      : "Complete your payment within this time"}
                  </p>
                </div>{" "}
                <h2 className="font-semibold text-xl text-[#1d1d1b] mb-4">
                  Payment Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Product</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      EMotorad Viper
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      {bookingData.quantity} unit(s)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold text-[#1d1d1b]">
                      NEFT/RTGS
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#1d1d1b]">
                        Amount to Transfer
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-[#dfb001]">
                          ₹{bookingData.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#fafafa] rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-2 mb-3">
                    <Lock className="w-4 h-4 text-[#dfb001] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#1d1d1b] mb-1">
                        Secure Transaction
                      </p>
                      <p className="text-xs text-gray-600">
                        Your payment will be verified within 24 hours of
                        receiving the UTR number
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Note:</strong> Please ensure you transfer the exact
                    amount shown above. Keep the transaction receipt for your
                    records.
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
