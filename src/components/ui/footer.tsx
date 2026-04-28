import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto hidden md:block">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          <div className="flex items-start space-x-3">
            <div className="flex flex-col">
              <Link to="/">
                <img
                  src="/logo.svg"
                  alt="ukevisa.com"
                  className="h-10 sm:h-12 min-w-[50px] rounded-sm"
                />
              </Link>

              {/* Add the company name and  registration no. */}
              <p className="text-xs text-white mt-3 leading-relaxed">
                M&M United Group LLC <br />
                Kuwait Commercial license 460102
              </p>

              <p className="text-xs text-white leading-relaxed">
                UK Company #{" "}
                <a
                  href="https://find-and-update.company-information.service.gov.uk/company/16931287"
                  target="_blank"
                  className="text-primary underline hover:text-primary/80"
                >
                  16931287
                </a>
              </p>
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-3">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/what-is-eta"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  What is ETA
                </Link>
              </li>
              <li>
                <Link
                  to="/eta-guide"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  ETA Guide
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/benefits"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Benefits
                </Link>
              </li>
              <li>
                <Link
                  to="/requirements"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Requirements
                </Link>
              </li> */}

              <li>
                <Link
                  to="/about-us"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/faqs"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li> */}
              <li>
                <Link
                  to="/contact-us"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-3">Legal & Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="flex items-center  text-sm text-gray-300 gap-2">
              <Mail size={16} className="text-[#ffffff]" />
              <a
                href="mailto:support@ukevisa.com"
                className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
              >
                support@ukevisa.com
              </a>
            </p>
            <p className="flex items-center  text-sm text-gray-300 mt-2 gap-2">
              <Phone size={16} className="text-[#ffffff]" />
              <a
                href="tel:+19014031000"
                className="text-gray-300 hover:text-primary font-medium transition-colors duration-200"
              >
                +1 901 403 1000
              </a>
            </p>
            <span className="flex items-start  text-sm text-gray-300 mt-2 leading-relaxed gap-2 font-medium transition-colors duration-200">
              <MapPin size={16} className="mt-1 text-[#fcfcfc]" />
              Abdulaziz Hamad Al Saqer St,
              <br />
              Block 12, Building 23, Unit 4
              <br />
              Qiblah, Kuwait
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-400">
          <div className="max-w-4xl mx-auto text-[16px]">
            Legal Disclaimer: This website is operated by M&M United Group LLC
            and designed to provide travellers with assistance in completing
            steps for the online Electronic Travel Authorization (ETA)
            application, at additional professional fees.
            {/* M&M United Group LLC is a visa services agency based in
                Abdulaziz Hamad Al Saqer St, Block 12, Building 23, Unit 4 
                Qiblah, Kuwait
          */}
            <br />
            You can apply for the UK ETA directly on the official government
            website without our service fees: www.gov.uk
          </div>
          <p>© 2026 UK EVISA | All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
