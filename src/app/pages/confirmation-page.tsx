import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { ContactRMSection } from "../components/contact-rm-section";
import { Button } from "../components/ui/button";
import { CheckCircle2, Download, Home } from "lucide-react";
import { useNavigate } from "react-router";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const details = localStorage.getItem('bookingDetails');
    if (!details || !JSON.parse(details).utrNumber) {
      navigate("/");
      return;
    }
    
    setBookingDetails(JSON.parse(details));
    setShowConfetti(true);
    
    // Auto-hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!bookingDetails) return null;

  const dealerName = localStorage.getItem("bookingDetails")
    ? JSON.parse(localStorage.getItem("bookingDetails")).franchiseName
    : "";
  const dealerEmail = localStorage.getItem("bookingDetails")
    ? JSON.parse(localStorage.getItem("bookingDetails")).email
    : "";
  
  const bookingDate = new Date(bookingDetails.date);
  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      <Header />
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#dfb001] rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <main className="py-12">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-[#dfb001] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-[bounce_1s_ease-in-out]">
              <CheckCircle2 className="w-14 h-14 text-[#1d1d1b]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1d1d1b] mb-3">
              Pre-Booking Received Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              Your order has been received and under review.
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-6">
            <div className="space-y-6">
              {/* Booking ID */}
              <div className="text-center pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Booking Reference Id</p>
                <p className="text-xl font-bold text-[#dfb001] tracking-wider">
                  {bookingDetails.bookingId}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Dealer Name</p>
                  <p className="font-semibold text-[#1d1d1b]">{dealerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-[#1d1d1b]">{dealerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Product</p>
                  <p className="font-semibold text-[#1d1d1b]">EMotorad Viper E-Bike</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Quantity</p>
                  <p className="font-semibold text-[#1d1d1b]">{bookingDetails.quantity} unit(s)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                  <p className="text-2xl font-bold text-[#dfb001]">
                    ₹{bookingDetails.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-[#1d1d1b]">
                    {bookingDetails.paymentMethod === 'upi' ? 'UPI Payment' : 'Net Banking'}
                    {bookingDetails.bank && ` (${bookingDetails.bank})`}
                  </p>
                </div> */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Booking Date</p>
                  <p className="font-semibold text-[#1d1d1b]">
                    {bookingDate.toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-600 mb-1">Expected Delivery Window</p>
                  <p className="font-semibold text-[#dfb001]">
                    {deliveryDate.toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div> */}
              </div>
            </div>
          </div>


          {/* Next Steps */}
          <div className="bg-gradient-to-br mb-8 from-[#dfb001]/10 to-transparent rounded-2xl p-6 border-2 border-[#dfb001]/20">
            <h3 className="font-semibold text-lg text-[#1d1d1b] mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#dfb001] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1d1d1b] text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1b]">Confirmation Email</p>
                  <p className="text-sm text-gray-600">
                    You'll receive a confirmation email with your booking details within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#dfb001] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1d1d1b] text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1b]">Dealer Support Contact</p>
                  <p className="text-sm text-gray-600">
                    Our team will reach out to discuss delivery logistics and documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#dfb001] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1d1d1b] text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-[#1d1d1b]">Delivery & Setup</p>
                  <p className="text-sm text-gray-600">
                    Your units will be delivered with complete documentation and dealer support materials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <ContactRMSection />
        </div>
      </main>
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
