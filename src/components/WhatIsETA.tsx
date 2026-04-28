import { nationalities } from "@/utils/nationalities";
import { Layout } from "./Layout";
import { Card, CardContent } from "./ui/card";
import {
  FileText,
  Mail,
  CreditCard,
  Camera,
  User,
  Briefcase,
  Shield,
  Upload,
  CheckCircle,
  AlertTriangle,
  Info,
  Plane,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

// Hero Section
export const ETAApplicationHero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hero-text mb-6">
            UK ETA Application
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed mb-6">
            Citizens of eligible countries who want to visit the United Kingdom
            for short stays may need to obtain an Electronic Travel
            Authorisation (ETA) before they travel. An ETA is a digital
            permission issued by the UK authorities that allows you to board a
            carrier to the UK. Having an ETA does not guarantee entry – the
            final decision is made by a UK Border Force officer on arrival.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg max-w-3xl mx-auto">
            <p className="text-sm text-gray-700 text-left">
              If you apply with us, we provide application support as a private
              company. We are not part of the UK Government or UK Visas and
              Immigration. Government fees are paid to the UK authorities; our
              service fee is separate and covers checking and submitting your
              information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Requirements Section
const requirements = [
  {
    icon: FileText,
    title: "Passport",
    description:
      "You must hold a valid, machine-readable passport from a nationality that can currently apply for an ETA. The passport must be valid for your entire stay in the UK. You will enter your passport details exactly as shown in the document.",
  },
  {
    icon: Camera,
    title: "Photograph",
    description:
      "You may be asked to upload a recent, clear, passport-style photo of yourself. Follow the instructions about background, lighting and image size during the application.",
  },
  {
    icon: Mail,
    title: "Email Address",
    description:
      "You must use an email address you can access regularly. Your ETA decision and any follow-up instructions will be sent to this address.",
  },
  {
    icon: Plane,
    title: "Travel Information",
    description:
      "You should know your intended travel dates and basic trip details (for example, where you plan to stay). You do not need to have booked flights or accommodation before starting an ETA application, but you should have an approximate plan.",
  },
];

export const ETARequirements = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-hero-bg/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              UK ETA Requirements
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Eligible applicants must provide accurate and honest information
              and have the required documents ready to complete the ETA
              application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((requirement, index) => {
              const Icon = requirement.icon;
              return (
                <Card
                  key={index}
                  className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-hero-text mb-2 text-lg">
                          {requirement.title}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {requirement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const getFlagUrl = (countryCode: string) => {
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
};

export const WhoIsEligible = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-hero-bg/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              Who Is Eligible for the UK ETA?
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-6">
              You may qualify to apply for an ETA if:
            </p>
          </div>

          <Card className="border-primary/20 shadow-lg max-w-4xl mx-auto mb-12">
            <CardContent className="p-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">
                    Your nationality is listed by the UK Government as eligible
                    for the ETA scheme; and
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">
                    You are travelling to the UK without a visa for tourism,
                    short-term business, visiting family and friends, short
                    study, or transit; and
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">
                    You do not already hold a UK visa or immigration status.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-hero-text text-center mb-8">
              Current ETA-eligible nationalities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {nationalities.map((country, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/40"
                >
                  <CardContent className="p-3 flex flex-col items-center gap-2">
                    <div className="w-20 h-12 rounded overflow-hidden flex items-center justify-center border border-border/50 shadow-sm bg-white">
                      <img
                        src={`https://flagcdn.com/${country?.code.toLowerCase()}.svg`}
                        alt={`${country.name} flag`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm font-medium text-center text-foreground/90 leading-tight">
                      {country.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-blue-50 border-blue-200 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <p className="text-sm text-gray-700 mb-3">
                You can also apply if you have a Taiwanese passport that
                includes your national identification card number.
              </p>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> The list of eligible nationalities
                  can change. Always confirm your status on the official UK
                  Government page "Check if you can get an electronic travel
                  authorisation (ETA)" on GOV.UK before applying.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Application Form Guide Section
const formSteps = [
  {
    number: "1",
    icon: User,
    title: "Personal Information",
    description:
      "Provide your full name, date of birth, gender and other personal details exactly as they appear in your passport.",
  },
  {
    number: "2",
    icon: FileText,
    title: "Passport Details",
    description:
      "Enter your passport number, issue and expiry dates, issuing country and any other requested details. Double-check for mistakes, as errors can cause delays or refusal.",
  },
  {
    number: "3",
    icon: Mail,
    title: "Contact Information",
    description:
      "Provide a current residential address, phone number and email address. This information is used to contact you about your application.",
  },
  {
    number: "4",
    icon: Briefcase,
    title: "Occupation and Employer Information",
    description:
      "You may be asked about your current job, employer name, address and your primary occupation. If you are unemployed, retired, a student or a homemaker, you can select the most appropriate option.",
  },
  {
    number: "5",
    icon: Shield,
    title: "Character and Security Questions",
    description:
      "Answer questions about criminal convictions, immigration history, security-related issues and previous visits to the UK or other countries. All answers must be truthful; providing false or misleading information can lead to refusal and future travel restrictions.",
  },
  {
    number: "6",
    icon: Plane,
    title: "Travel Details",
    description:
      "Give basic information about your intended visit, such as purpose of travel (tourism, business, family visit, etc.), approximate dates and where you plan to stay in the UK.",
  },
  {
    number: "7",
    icon: Upload,
    title: "Document Uploads",
    description:
      "Where required, upload a clear image of your passport and your photo, following the instructions on the application form or the official UK ETA app.",
  },
  {
    number: "8",
    icon: CheckCircle,
    title: "Review and Confirm",
    description:
      "Carefully review all information before submitting. Correct any spelling mistakes or inaccuracies to reduce the risk of delays.",
  },
  {
    number: "9",
    icon: CreditCard,
    title: "Pay the ETA Fee",
    description:
      "Pay the UK Government ETA fee (currently £20 per applicant) using a debit or credit card or accepted digital wallet. If you use our assistance service, our professional service fee (for review and submission support) is £52 per application. This is in addition to the UK Government fee, bringing the typical total cost to £72 per applicant. Our fee is non-refundable once we start processing your application, regardless of the government's decision.",
  },
];

export const HowToFillForm = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-hero-bg/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              How to Fill Out the UK ETA Application Form
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Each applicant, including children and babies, must complete a
              separate ETA application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={index}
                  className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group relative"
                >
                  <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {step.number}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-hero-text mb-2 text-base">
                          {step.title}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// How to Apply Section
const applySteps = [
  {
    number: "1",
    title: "Complete the ETA Application Form",
    description:
      "Fill in the online form with your personal, passport and travel details. Make sure the information matches your passport exactly.",
  },
  {
    number: "2",
    title: "Pay the Required Fees",
    description:
      "Pay the ETA application fee. Keep a copy of your payment confirmation for your records.",
  },
  {
    number: "3",
    title: "Receive Your ETA Decision",
    description:
      "Most applications receive a decision within 3 working days, and many are decided faster, but some may take longer. You will receive one of the following outcomes by email: Approved – Your ETA is granted and digitally linked to your passport. Refused – Your ETA is refused by the UK authorities. In this case, you may be advised to apply again or apply for a visa instead according to the given instructions on what to do next. Private services cannot overturn a refusal. Keep the decision email for your records when travelling.",
  },
];

export const HowToApply = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-hero-bg/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              How to Apply for the UK ETA
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              The UK ETA application process is fully online.
            </p>
          </div>

          <div className="space-y-6">
            {applySteps.map((step, index) => (
              <Card
                key={index}
                className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="flex gap-4 sm:gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-semibold text-hero-text mb-2 sm:mb-3">
                        {step.title}
                      </h3>
                      <p className="text-base text-foreground/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Travelling After Approval Section
const travelSteps = [
  {
    number: "1",
    title: "Check Your Passport and ETA Details",
    description:
      "Confirm that your ETA is issued for the same passport you will use to travel. If you obtain a new passport, you must apply for a new ETA.",
  },
  {
    number: "2",
    title: "Plan Your Trip Within the ETA Validity",
    description:
      "An ETA is generally valid for up to 2 years or until your passport expires, whichever comes first, and can be used for multiple short visits of up to 6 months each. Ensure your trip falls within this period and that you respect the permitted length of stay.",
  },
  {
    number: "3",
    title: "Check Airline and Carrier Requirements",
    description:
      "When checking in, your airline or transport provider will electronically verify that you have a valid ETA or other permission to travel. Have your passport and travel confirmation ready in case they ask for evidence.",
  },
  {
    number: "4",
    title: "Prepare Supporting Documents",
    description:
      "Although an ETA is digital, you may be asked at the border to show: Proof of accommodation (hotel booking or invitation letter), Evidence of funds to cover your stay, Return or onward travel booking, Details of your plans in the UK. Bring printed or digital copies to make the process easier.",
  },
  {
    number: "5",
    title: "Arrival in the UK",
    description:
      "On arrival, follow signs for border control. Depending on your nationality and passport type, you may be able to use ePassport gates. A Border Force officer can still ask you questions about your visit and has the final say on entry, even if you hold a valid ETA.",
  },
  {
    number: "6",
    title: "Respect UK Immigration Rules During Your Stay",
    description:
      "While in the UK, you must: Leave the UK before your permission to stay ends, Avoid any work, study or activities that are not allowed under the ETA conditions, Always follow UK laws and immigration rules. If you later decide to work, live or study in the UK long-term, you will generally need to apply for an appropriate visa instead of relying on an ETA.",
  },
];

export const TravellingAfterApproval = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-hero-bg/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              Travelling to the UK After Your ETA Is Approved
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              Once your ETA has been granted, follow these steps to travel
              smoothly:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {travelSteps.map((step, index) => (
              <Card
                key={index}
                className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-hero-text text-lg pt-1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed pl-14">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const faqs = [
  {
    question: "What is the UK ETA?",
    answer:
      "The UK ETA is a digital permit allowing visa-exempt nationals to travel to or through the UK for short stays. It is not a guarantee of entry — final permission is given by the border officer upon arrival.",
  },
  {
    question: "Who must apply for a UK ETA?",
    answer:
      "Nationals of countries that don't need a visa to travel to the UK (for short stays).",
  },
  {
    question: "How long does the ETA process take?",
    answer:
      "Processing times vary by individual circumstances. Most applicants receive their ETA decision within minutes or hours, but it may take up to 3 working days.",
  },
  {
    question: "Is this the official UK Government website?",
    answer:
      "No. We are an independent travel assistance provider. The official government fee is £20. Our service fee is £52 for application assistance and support.",
  },
  {
    question: "Can you guarantee approval?",
    answer:
      "No. Only UK authorities decide the outcome. We assist with preparation and submission.",
  },
  {
    question: "Do children need their own ETA?",
    answer:
      "Yes. Each traveler, including babies and children, must have their own approved ETA associated with their passport before travelling.",
  },
  {
    question: "How long is the ETA valid for?",
    answer:
      "Once approved, the ETA is typically valid for multiple visits over up to two years or until your passport expires, whichever is sooner.",
  },
  {
    question: "How long can I stay on each visit?",
    answer: "You can stay in the UK for up to six months during each visit.",
  },
  {
    question: "How far in advance should I apply?",
    answer:
      "Although many decisions are issued quickly, it is recommended to apply at least one week before travelling to avoid delays.",
  },
];

export const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-hero-bg/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-hero-text pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <div
                        className={`transform transition-transform duration-200 ${
                          openFAQ === index ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-8 text-foreground/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Legal Information Section
export const LegalInformation = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-4">
                <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-2xl font-bold text-hero-text">
                  Important Legal & Compliance Information
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-foreground/70 pl-10">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    M&M United Group LLC is an independent travel support service. We
                    are not affiliated with or endorsed by the Government of the
                    United Kingdom, UK Visas and Immigration, or any government
                    body.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    All decisions on ETA applications are made solely by the UK
                    authorities. No private company can guarantee approval or
                    faster processing.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Information on ETA eligibility, fees and requirements can
                    change. Before applying or travelling, always review the
                    latest official guidance on GOV.UK.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
export const WhatIsETA = () => {
  return (
    <>
      {/* <Helmet>
        <title>Application United Kingdom ETA</title>
        <meta
          name="description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />

        <meta property="og:title" content="Application United Kingdom ETA" />
        <meta
          property="og:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/application" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Application United Kingdom ETA" />
        <meta
          name="twitter:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
      </Helmet> */}
      <Layout>
        <div className="min-h-screen">
          <ETAApplicationHero />
          <ETARequirements />
          <WhoIsEligible />
          <HowToFillForm />
          <HowToApply />
          <TravellingAfterApproval />
          <FAQSection />
          <LegalInformation />
        </div>
      </Layout>
    </>
  );
};
