import { Button } from "./ui/button";

const svgPaths = {
  whatsapp: "M5.26168 13.3207C6.53286 13.9728 7.99514 14.1494 9.38502 13.8187C10.7749 13.4881 12.001 12.6719 12.8423 11.5172C13.6837 10.3625 14.0849 8.94532 13.9738 7.52097C13.8627 6.09663 13.2465 4.7588 12.2363 3.74857C11.226 2.73835 9.88821 2.12216 8.46387 2.01104C7.03952 1.89992 5.62232 2.30118 4.46764 3.14252C3.31297 3.98385 2.49676 5.20993 2.16609 6.59982C1.83543 7.9897 2.01205 9.45198 2.66414 10.7232L1.33207 14.6528L5.26168 13.3207Z",
};

export function ContactRMSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* CTA Section */}
        <div className="bg-[#1d1d1b] rounded-[16px] p-8 md:p-12 text-center border border-[#dfb001]/20 shadow-2xl relative">
          <h3 className="text-2xl md:text-3xl font-['Poppins'] font-bold text-white mb-4">
            Still Have a Question?
          </h3>
          
          <div className="flex justify-center">
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border border-[#dfb001] text-[#dfb001] hover:bg-[#dfb001] hover:text-[#1d1d1b] font-['Inter'] font-bold text-base px-8 py-6 h-[50px] w-auto flex items-center justify-center gap-3 rounded-[8px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d={svgPaths.whatsapp} stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Contact Your RM
            </Button>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center mt-16 pt-8 border-t border-[#f3f4f6]">
          <p className="text-sm font-['Inter'] text-[#6a7282]">&copy; 2026 EMotorad. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
