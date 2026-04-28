import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FAQsPage from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsAndConditions from "./pages/TermsandConditions";
import ContactUsPage from "./pages/ContactUs";
import AboutUsPage from "./pages/AboutUs";
import Requirements from "./pages/Requirements";
import Benefits from "./pages/Benefits";
import Eligibility from "./pages/Eligibility";
import ScrollToTop from "./components/ui/ScrollToTp";
import RefundPolicy from "./pages/RefundPolicy";
import { WhatIsETA } from "./components/WhatIsETA";
import ETAGuide from "./components/ETAGuide";

const queryClient = new QueryClient();

// const GoogleAnalytics = () => {
//   const location = useLocation();

//   useEffect(() => {
//     // Ensure dataLayer exists
//     if ((window as any).dataLayer) {
//       (window as any).dataLayer.push({
//         event: "pageview",
//         page: location.pathname,
//       });
//     }
//   }, [location]);

//   return null;
// };

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* <GoogleAnalytics /> */}
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />

              {/* <Route path="/faqs" element={<FAQsPage />} /> */}
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/what-is-eta" element={<WhatIsETA />} />
              <Route path="/eta-guide" element={<ETAGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
