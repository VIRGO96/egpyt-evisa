import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MoveRight, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ContactUsPage = () => {
  return (
    <>
      {/* <Helmet>
        <title>Contact United Kingdom ETA</title>
        <meta
          name="description"
          content="Visit UK is a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />

        <meta property="og:title" content="Contact United Kingdom ETA" />
        <meta
          property="og:description"
          content="Visit UK is a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/contact-us" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact United Kingdom ETA" />
        <meta
          name="twitter:description"
          content="Visit UK is a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
      </Helmet> */}
      <Layout>
        <section className="container mx-auto px-4 sm:px-8 py-5 sm:py-8">
          <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-12 py-12">
              {/* Main Heading & CTA */}
              <div className="text-center max-w-3xl space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                  Contact
                </h1>
                <p className="text-gray-700 text-lg md:text-xl">
                  Please check your junk mailbox or spam folder before
                  contacting us about your ETA application.
                </p>
              </div>

              {/* Sub-cards */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-3xl w-full">
                {/* Email Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg flex flex-col flex-1 basis-0 items-center text-center transform hover:scale-105 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mb-4"
                  >
                    <path
                      d="M6 8L9.7812 10.5208C11.1248 11.4165 12.8752 11.4165 14.2188 10.5208L18 8M6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21Z"
                      stroke="#12181D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-semibold mb-2">Email</p>
                  <a
                    className="hover:text-blue-500"
                    href="mailto: support@ukevisa.com"
                  >
                    support@ukevisa.com
                  </a>
                </div>

                {/* Phone no. card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg flex flex-col flex-1 basis-0 items-center text-center transform transition-transform hover:scale-105 duration-500">
                  <Phone className="mb-4 h-10 w-10 text-gray-900" />
                  <p className="font-semibold mb-2">Phone</p>
                  <a className="hover:text-blue-500" href="tel:+19014031000">
                    +1 901 403 1000
                  </a>
                </div>

                {/* Address Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-lg flex flex-col flex-1 basis-0 items-center text-center transform hover:scale-105 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mb-4"
                  >
                    <circle
                      cx="12"
                      cy="11"
                      r="3"
                      stroke="#12181D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M21 10.8889C21 15.7981 15.375 22 12 22C8.625 22 3 15.7981 3 10.8889C3 5.97969 7.02944 2 12 2C16.9706 2 21 5.97969 21 10.8889Z"
                      stroke="#12181D"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <p className="font-semibold mb-2">Address</p>
                  <p className="text-gray-800 leading-relaxed text-sm">
                    <span>
                      Abdulaziz Hamad Al Saqer St, Block 12, Building 23,
                      <br />
                      Unit 4 Qiblah, Kuwait
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-center max-w-3xl space-y-6">
                <p className="text-gray-700 text-lg md:text-xl">
                  Contact us at M&M United Group LLC and speak to our
                  independent advisors who can assist you with all questions
                  regarding UK Electronic Travel Authorization.
                </p>
              </div>

              <div className="w-full max-w-4xl">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Note:</strong> We are an independent service
                    provider and not affiliated with the UK Government. For
                    official government services, please visit: www.gov.uk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ContactUsPage;
