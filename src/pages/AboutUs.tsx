import { Layout } from "@/components/Layout";
import { CheckCircle } from "lucide-react";
import travelInfo from "@/assets/eta-travel-info.jpg";
import { Helmet } from "react-helmet-async";

const AboutUsPage = () => {
  return (
    <>
      {/* <Helmet>
        <title>About Us - UK ETA Support Services</title>
        <meta
          name="description"
          content="Learn about our professional visa-assistance services. We provide clear, reliable guidance for travelers who need help with UK ETA and travel documentation applications."
        />
        <meta
          property="og:title"
          content="About Us - UK ETA Support Services"
        />
        <meta
          property="og:description"
          content="Learn about our professional visa-assistance services. We provide clear, reliable guidance for travelers who need help with UK ETA and travel documentation applications."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/about-us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us - UK ETA Support Services"
        />
        <meta
          name="twitter:description"
          content="Learn about our professional visa-assistance services. We provide clear, reliable guidance for travelers who need help with UK ETA and travel documentation applications."
        />
      </Helmet> */}
      <Layout>
        <div className="container mx-auto px-4 sm:px-8 py-5 sm:py-8">
          {/* Main Card */}
          <div className="w-full flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-4 md:p-12">
            <div className="max-w-3xl text-center mb-6 sm:mb-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 mb-3 sm:mb-6">
                About Us - M&M United Group LLC
              </h1>
            </div>

            {/* Who We Are Section */}
            <div className="w-full max-w-6xl mb-12">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Who We Are
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  M&M United Group LLC is a professional visa-assistance
                  company. Our goal is to provide clear, reliable, and
                  easy-to-understand information for travelers who need guidance
                  with visa and travel documents applications and travel
                  documentation.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are an independent private company, not affiliated with any
                  government authority. All government fees remain separate and
                  are paid directly to the relevant immigration departments. Our
                  role is to offer helpful services that simplify the
                  application process for travelers.
                </p>

                {/* COMPANY ADDRESS - Commented for future use */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Our registered business information:</strong>
                    <br />
                    M&M United Group LLC
                    <br />
                    Abdulaziz Hamad Al Saqer St, Block 12, Building 23,
                    <br />
                    Unit 4 Qiblah, Kuwait
                  </p>
                </div>
              </div>
            </div>

            {/* What We Do Section */}
            <div className="w-full max-w-6xl mb-12">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-md border border-primary/20 p-4 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  What We Do
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  M&M United Group LLC offers a range of visa-related support
                  services designed to help travelers prepare and submit
                  applications correctly. Our services include:
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Step-by-step guidance on visa requirements
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We explain eligibility rules, documentation needs, and
                        the official steps required to submit your application.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Application form assistance
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our team helps you complete application forms accurately
                        to avoid common errors.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Document preparation support
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We guide you through preparing and organizing the
                        necessary documents for your application.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        General travel information and eligibility guidance
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We provide comprehensive information to help you
                        understand your eligibility and requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Customer support throughout the process
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our support team is available to answer your questions
                        and provide assistance at every step.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mt-6">
                  We aim to ensure that travelers have access to accurate,
                  up-to-date information so they can apply with confidence and
                  avoid common errors.
                </p>
              </div>
            </div>

            {/* Our Mission Section */}
            <div className="w-full max-w-6xl mb-12">
              <div className="h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-md border border-primary/20 p-4 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our mission is to make visa and travel documents processes
                  simpler, faster, and more accessible. We believe that
                  travelers should have access to trustworthy information and
                  professional assistance when needed.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Transparency, accuracy, and customer care are at the core of
                  our service.
                </p>
              </div>
            </div>

            {/* Commitment to Transparency */}
            <div className="w-full max-w-6xl mb-8">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Commitment to Transparency
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To comply with industry standards and legal requirements, M&M
                  United Group LLC ensures:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Clear disclosure that we are a private service provider
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Transparent display of all service fees (when applicable)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      No misleading claims, guarantees, or affiliation
                      statements
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Accurate and factual information based on official public
                      sources
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>
                      Easy access to customer support for any inquiries
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  We help clients navigate the visa and travel documents
                  process, but final decisions are always made by the relevant
                  government authorities.
                </p>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="w-full max-w-6xl mb-8">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl shadow-md border border-primary/20 p-4 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose Us
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Travelers choose M&M United Group LLC because we provide:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Reliable, easy-to-follow guidance
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Clear instructions that simplify complex processes
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Responsive customer assistance
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Quick support when you need help
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Organized documentation support
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Help organizing and preparing your documents
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        User-friendly process
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Designed to reduce stress and confusion
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mt-6">
                  Our team aims to deliver helpful service while maintaining
                  full compliance with legal requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer Section (Outside Main Box) */}
          <div className="mt-8 w-full bg-white border-l-4 border-primary rounded-xl shadow-md px-6 py-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Disclaimer</h4>
            <p className="text-md text-gray-700 leading-relaxed">
              We are an independent travel support service provider. We are not
              associated with, endorsed by, or acting on behalf of the UK
              Government. Travelers may apply directly through the official
              government platform without using our assistance services.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutUsPage;
