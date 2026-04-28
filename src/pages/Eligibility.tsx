import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Info,
  FileText,
  Home,
  Users,
  Plane,
  Globe,
  XCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import airportImg from "@/assets/uk-eta-banner.jpg";
import londonImg from "@/assets/UK-transit-eta.jpg";
import { nationalities } from "@/utils/nationalities";
import { Helmet } from "react-helmet-async";

const Eligibility = () => {
  const timelineEvents = [
    {
      title: "2023 – ETA Announced & First Launch",
      events: [
        {
          date: "March 2023",
          description:
            "The UK government publicly announces the new Electronic Travel Authorisation (ETA) system for visa-free travelers",
        },
        {
          date: "October 25, 2023",
          description:
            "ETA applications open for Qatari nationals for travel on or after November 15, 2023",
        },
        {
          date: "November 15, 2023",
          description:
            "Qatar becomes the first nationality required to hold a UK ETA for short visits and transit",
        },
      ],
    },
    {
      title: "2024 – Rollout Expands to GCC Countries",
      events: [
        {
          date: "February 1, 2024",
          description:
            "ETA applications open for Bahrain, Kuwait, Oman, Saudi Arabia, UAE, Jordan* - For travel on or after February 22, 2024",
        },
        {
          date: "February 22, 2024",
          description:
            "Nationals of the above countries begin requiring a UK ETA for short visits.",
          noteTitle: "Important Note About Jordan",
          note: "Jordan was initially included in ETA rollout communications but was later removed from certain eligibility lists.",
        },
        {
          date: "November 27, 2024",
          description:
            "ETA applications open for many remaining non-European visa-free nationalities such as: Many countries in North & South America, Many countries in the Asia-Pacific region, Caribbean visa-free travellers, Other visa-exempt nationalities - For travel on or after January 8, 2025",
        },
        {
          date: "January 8, 2025",
          description:
            "Most travellers from these visa-free countries begin needing a UK ETA to visit or transit.",
        },
      ],
    },
    {
      title: "2025 – ETA for European Nationals",
      events: [
        {
          date: "March 5, 2025",
          description:
            "ETA applications open for most European visa-free nationals (EU and EEA citizens) - For travel on or after April 2, 2025",
        },
        {
          date: "April 2, 2025",
          description:
            "Many European travellers begin needing a UK ETA for short visits",
        },
      ],
    },
  ];

  const whoDoesntNeed = [
    {
      icon: Home,
      title: "Irish citizens",
      description: "Citizens of Ireland do not require an ETA",
    },
    {
      icon: FileText,
      title: "UK passport holders",
      description: "Anyone holding a UK passport is exempt",
    },
    {
      icon: Users,
      title: "Valid UK visas or residence status",
      description:
        "People with valid UK visas or residence status do not need an ETA",
    },
    {
      icon: Globe,
      title: "Visa-required travelers",
      description: "Travellers who already require a visa to visit the UK",
    },
  ];

  const refusalReasons = [
    "False or incomplete information",
    "Certain criminal convictions",
    "Previous immigration breaches",
    "Security concerns",
  ];

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`; // w160 instead of w40
  };

  const faqs = [
    {
      question: "Is ETA a visa?",
      answer: "No—it is a travel authorisation for visa-exempt visitors.",
    },
    {
      question: "Do children need an ETA?",
      answer: "Yes, every traveller requires their own ETA.",
    },
    {
      question: "Can ETA holders work in the UK?",
      answer: "No. Only permitted visitor activities are allowed.",
    },
    {
      question: "Can this website guarantee approval?",
      answer: "No. Only the UK government makes ETA decisions.",
    },
  ];

  return (
    <>
      {/* <Helmet>
        <title>Eligibility United Kingdom ETA</title>
        <meta
          name="description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />

        <meta property="og:title" content="Eligibility United Kingdom ETA" />
        <meta
          property="og:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/eligibility" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eligibility United Kingdom ETA" />
        <meta
          name="twitter:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
      </Helmet> */}
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-primary">UK ETA</span> Eligibility
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Find out who is eligible for the UK Electronic Travel
                Authorisation (ETA), who is exempt, and how to check your status
                before travelling.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg max-w-4xl mx-auto">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> This is an independent information
                  website and not affiliated with the UK government. You can
                  always apply for an ETA on the official government website for
                  the standard government fee.
                </p>
              </div>
            </div>

            {/* What is UK ETA */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Info className="h-8 w-8 text-primary" />
                    What Is the UK ETA?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    The Electronic Travel Authorisation is a digital travel
                    permission for short visits by travellers from visa-exempt
                    countries. It is electronically linked to your passport and
                    allows visits for:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      "Tourism",
                      "Family visits",
                      "Business trips",
                      "Short study",
                      "Transit",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-primary/5 p-3 rounded-lg text-center"
                      >
                        <p className="text-sm font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded">
                    Having an ETA does not guarantee entry; UK border officers
                    make the final decision.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Image - Airport */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={airportImg}
                  alt="Airport terminal with luggage"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* ETA Rollout Timeline */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                ETA Rollout Timeline
              </h2>
              <div className="max-w-5xl mx-auto space-y-8">
                {timelineEvents.map((section, idx) => (
                  <Card key={idx} className="border-primary/20">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                      <CardTitle className="flex items-center gap-3">
                        <Calendar className="h-6 w-6 text-primary" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {section.events.map((event, eventIdx) => (
                          <div
                            key={eventIdx}
                            className="flex gap-4 items-start"
                          >
                            <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2"></div>
                            <div>
                              <p className="font-bold text-lg">{event.date}</p>
                              <p className="text-muted-foreground">
                                {event.description}
                              </p>
                              {event.note && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                  <p className="font-semibold flex items-center gap-2 mb-1">
                                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                                    {event.noteTitle}
                                  </p>

                                  <p className="text-yellow-800 text-sm leading-relaxed">
                                    {event.note}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="max-w-5xl mx-auto mt-8">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      What This Means for Travellers
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        • Eligibility continues to expand until all visa-free
                        nationalities use ETA
                      </li>
                      <li>
                        • Travellers should always check current UK government
                        guidance, as rollout phases may evolve
                      </li>
                      <li>• ETA is a travel authorisation, not a visa</li>
                      <li>
                        • This information is general guidance only and is not
                        legal advice
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Image - London */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={londonImg}
                  alt="London Tower Bridge"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Who Is Eligible */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Who Is Eligible to Apply for a UK ETA?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                All eligible nationalities (A–Z)
              </p>

              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {nationalities.map((country, index) => (
                    <Card
                      key={index}
                      className={`
        text-center p-6 rounded-2xl border border-border/40 
        bg-gradient-to-b from-card/80 to-background/40 backdrop-blur-md
        transition-all duration-500 
        
        hover:-translate-y-1 
        
        hover:shadow-xl 
        
        hover:border-primary/40
    `}
                      style={{
                        // DEFAULT SHADOW: Use accentcolor with some transparency for a subtle effect
                        // NOTE: This assumes accentcolor is defined as a CSS variable (e.g., --accent-color)
                        boxShadow: `0 4px 20px -4px var(--accent-color, rgba(0,0,0,0.4))`,
                      }}
                    >
                      {/* Flag Circle - NO CHANGES/HOVER EFFECTS on this element */}
                      <div
                        className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center 
        shadow-md ring-2 ring-border overflow-hidden"
                      >
                        <img
                          src={getFlagUrl(country.code)}
                          alt={country.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      {/* Country Name */}
                      <h3 className="text-lg font-semibold text-foreground tracking-wide">
                        {country.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                        Eligible for ETA
                      </p>
                    </Card>
                  ))}
                </div>

                <Card className="mt-8 bg-yellow-50 border-yellow-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Notes for Compliance & Accuracy
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>
                        • Citizens of Ireland do not require an ETA, but are
                        often listed for clarity
                      </li>
                      <li>
                        • This list contains the commonly recognized non-visa
                        nationals, who typically require an ETA
                      </li>
                      <li>
                        • This list may change as the UK expands the ETA system,
                        so applicants should always check GOV.UK
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Who Doesn't Need */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Who Does <span className="text-primary">NOT</span> Need a UK
                ETA?
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {whoDoesntNeed.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={index}
                      className="p-6 text-center border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-primary/10 rounded-xl">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Transit Eligibility */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <CardTitle className="flex items-center gap-3">
                    <Plane className="h-6 w-6 text-primary" />
                    Transit Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    You may need an ETA for:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />{" "}
                      Airside transit
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />{" "}
                      Landside transit
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />{" "}
                      Changing airports
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />{" "}
                      Long layovers
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    Rules depend on nationality and route.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* When ETA May Be Refused */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-red-900">
                    <XCircle className="h-6 w-6 text-red-600" />
                    When an ETA May Be Refused
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {refusalReasons.map((reason, idx) => (
                      <li key={idx} className="flex gap-2 text-red-800">
                        <span className="text-red-600">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-red-700 font-semibold">
                    Only UK authorities decide eligibility.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* How to Check */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <CardTitle>
                    How to Check If YOU Personally Need an ETA
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary text-lg">1.</span>
                      <span>Visit the official UK government ETA guidance</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary text-lg">2.</span>
                      <span>Answer nationality & travel purpose questions</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary text-lg">3.</span>
                      <span>
                        See if you need an ETA, visa, or no entry permission
                      </span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <Card key={idx} className="border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-primary">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary to-primary/80 text-white border-0">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
                  <p className="text-white/90 mb-6 text-lg">
                    Start your UK ETA application process today
                  </p>
                  <div className="flex justify-center mb-12">
                    <Link to="/apply">
                      <Button
                        size="lg"
                        className="inline-flex items-center text-primary px-8 py-4 bg-white rounded-lg hover:text-primary/80 hover:bg-white/80"
                      >
                        Apply for ETA
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto mt-8">
              <Card className="border-l-4 border-primary p-6 bg-gray-50">
                <p className="text-sm text-gray-700">
                  <strong>Disclaimer:</strong> This is general information only,
                  not legal advice. This website is independent and not
                  affiliated with the UK Government. You can always apply for an
                  ETA directly on the official UK government website.
                </p>
              </Card>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Eligibility;
