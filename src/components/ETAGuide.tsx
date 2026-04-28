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
  Briefcase,
  GraduationCap,
  Palette,
  Clock,
  CreditCard,
  Mail,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import airportImg from "@/assets/uk-eta-banner.jpg";
import londonImg from "@/assets/uk-eta-transit.jpg";
import businessImg from "@/assets/business-activities-eta.jpg";
import tourismImg from "@/assets/tourism-uk-eta.jpg";
import clockTower from "@/assets/clocktower-london-eta.jpg";
import academicImg from "@/assets/london-clocktower-eta.jpg";
import creativeImg from "@/assets/creative-workers-eta.jpg";
import transitImg from "@/assets/transit-uk-eta.jpg";
import travelImg from "@/assets/london-eta.jpg";
import personalPhoto from "@/assets/eta-personal-photo.jpg";
import passportImg from "@/assets/uk-eta-passport.jpg";
import { nationalities } from "@/utils/nationalities";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import passport from "@/assets/eta-passport.jpg";
import personal from "@/assets/eta-personal-photo.jpg";
import travelInfo from "@/assets/eta-travel-info.jpg";
import security from "@/assets/uk-eta-security.jpg";
import credit from "@/assets/eta-payment-method.jpg";
import email from "@/assets/eta-email.jpg";

const ETAGuide = () => {
  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`;
  };
  const requirements = [
    {
      number: "1",
      icon: FileText,
      title: "A Valid Biometric Passport",
      description: "Your passport must:",
      points: [
        "Be biometric (contains a digital chip)",
        "Be valid for your entire stay",
      ],
      image: passport,
      note: "The ETA is digitally linked to your passport. If you renew your passport later, you will need a new ETA.",
    },
    {
      number: "2",
      icon: User,
      title: "Personal Details",
      description: "You will need to provide:",
      points: [
        "Full name",
        "Date of birth",
        "Passport number",
        "Nationality",
        "Contact information",
      ],
      image: personal,
      note: "Make sure everything matches your passport exactly.",
    },
    {
      number: "3",
      icon: Plane,
      title: "Basic Travel Information",
      description: "You may be asked about:",
      points: [
        "Your intended dates",
        "Purpose of your visit",
        "Where you plan to stay",
      ],
      image: travelInfo,
      note: "You do not need to upload tickets or hotel booking during application, but having a plan helps.",
    },
    {
      number: "4",
      icon: Shield,
      title: "Security & Eligibility Questions",
      description: "These include simple yes/no questions about:",
      points: [
        "Past immigration history",
        "Criminal history",
        "Security-related concerns",
      ],
      image: security,
      note: "Answering truthfully is essential.",
    },
    {
      number: "5",
      icon: CreditCard,
      title: "Application Fee",
      description:
        "Pay the ETA application fee which includes official government fee and our service fee. Payment is made online using:",
      points: [
        "Credit card",
        "Debit card",
        "Digital wallet (depending on region)",
      ],
      image: credit,
      note: null,
    },
    {
      number: "6",
      icon: Mail,
      title: "Email Address",
      description:
        "A valid email address is required to receive the ETA application updates.",
      points: [],
      image: email,
      note: null,
    },
  ];

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

  const activities = [
    {
      title: "Holidays and City Breaks",
      icon: Users,
      image: tourismImg,
      points: [
        "Visit London, Edinburgh, Cardiff, Belfast and other destinations across the UK",
        "Enjoy sightseeing, shopping and cultural attractions",
        "Take repeated weekend breaks or longer holidays while your ETA is valid",
      ],
    },
    {
      title: "Visiting Family and Friends",
      icon: Users,
      image: clockTower,
      points: [
        "Visit relatives and friends who live in the UK",
        "Attend weddings, birthdays, graduations and other private events",
        "Make several family visits over the validity of your ETA, as long as you follow the visitor rules",
      ],
    },
    {
      title: "Business Trips and Meetings",
      icon: Briefcase,
      image: businessImg,
      points: [
        "Attend business meetings and conferences",
        "Take part in short-term training or events that are permitted for visitors",
        "Make multiple short business trips while your ETA remains valid",
      ],
      note: "Always check the latest UK government guidance on what types of business activity are allowed as a visitor.",
    },
    {
      title: "Short Study and Courses",
      icon: GraduationCap,
      image: academicImg,
      points: [
        "Attend short courses or study programmes (for example, language courses or summer schools)",
        "Take part in study activities that are permitted for visitors and do not require a full study visa",
      ],
    },
    {
      title: "Certain Short Creative Work",
      icon: Palette,
      image: creativeImg,
      points: [
        "In some cases, and only where the UK rules allow it, an ETA may be used when you are coming to the UK as a creative worker for a short time (for example, performers or artists)",
      ],
      note: "This depends on your circumstances and the route you use. Always consult current official guidance before travelling.",
    },
    {
      title: "Transit Through the UK",
      icon: Plane,
      image: transitImg,
      points: [
        "You are passing through a UK airport",
        "You go through UK border control before reaching your final destination",
        "Having a valid ETA in advance can help your connection go more smoothly if the rules require it",
      ],
    },
  ];

  const mainRequirements = [
    {
      title: "A Valid Biometric Passport",
      icon: FileText,
      points: [
        "Be biometric (contains a digital chip)",
        "Be valid for your entire stay",
        "The ETA is digitally linked to your passport. If you renew your passport later, you will need a new ETA",
      ],
    },
    {
      title: "Personal Details",
      icon: User,
      points: [
        "Full name",
        "Date of birth",
        "Passport number",
        "Nationality",
        "Contact information",
      ],
      note: "Make sure everything matches your passport exactly",
    },
    {
      title: "Basic Travel Information",
      icon: FileText,
      points: [
        "Your intended dates",
        "Purpose of your visit",
        "Where you plan to stay",
      ],
      note: "You do not need to upload tickets or hotel booking during application, but having a plan helps",
    },
    {
      title: "Security & Eligibility Questions",
      icon: CheckCircle,
      points: [
        "Past immigration history",
        "Criminal history",
        "Security-related concerns",
      ],
      note: "Answering truthfully is essential",
    },
    {
      title: "Application Fee",
      icon: CreditCard,
      points: [
        "Credit card",
        "Debit card",
        "Digital wallet (depending on region)",
      ],
      note: "There is a small official fee set by the UK Government. Payment is made online",
    },
    {
      title: "Email Address",
      icon: Mail,
      points: [
        "A valid email address is required to receive the ETA application updates",
      ],
    },
  ];

  const photoRequirements = [
    {
      category: "Recent & Unedited",
      items: ["Taken within the last 30 days"],
    },
    {
      category: "Clear Image Quality",
      items: [
        "Sharp, well-lit, and in focus",
        "No filters, edits, or enhancements",
        "Neutral lighting with no shadows on the face",
        "High-resolution JPEG/PNG recommended",
      ],
    },
    {
      category: "Face & Expression",
      items: [
        "Look straight at the camera",
        "Neutral expression, mouth closed",
        "Eyes open and clearly visible",
        "Entire face visible without obstruction",
      ],
    },
    {
      category: "Background",
      items: [
        "Plain, light background (white or light grey)",
        "No patterns, objects, or shadows",
      ],
    },
    {
      category: "Clothing & Accessories",
      items: [
        "Religious head coverings allowed for women only",
        "No hats, sunglasses, or tinted lenses",
        "Eye glasses not allowed",
      ],
    },
    {
      category: "Children's Photos",
      items: [
        "Child must be alone in the photo",
        "No visible hands or support",
        "Closed eyes allowed for infants",
      ],
    },
  ];

  const comparisonData = [
    {
      feature: "Who needs it?",
      eta: "Nationals of visa-free countries",
      visa: "Nationals of countries requiring a visa",
    },
    {
      feature: "Application type",
      eta: "Online, fast, simple",
      visa: "Full visa application with documents & biometrics",
    },
    {
      feature: "Processing time",
      eta: "Minutes to a few days",
      visa: "Weeks (varies by country)",
    },
    {
      feature: "Validity",
      eta: "2 years (multiple entries)",
      visa: "Usually 6 months; long-term options available",
    },
    {
      feature: "Allowed stay per visit",
      eta: "Up to 6 months",
      visa: "Usually up to 6 months",
    },
    {
      feature: "Can you work?",
      eta: false,
      visa: false,
    },
    {
      feature: "Can you study long-term?",
      eta: false,
      visa: false,
    },
    {
      feature: "Cost",
      eta: "Lower cost",
      visa: "Higher cost, varies by route",
    },
  ];

  const refusalReasons = [
    "False or incomplete information",
    "Certain criminal convictions",
    "Previous immigration breaches",
    "Security concerns",
  ];

  return (
    <>
      {/* <Helmet>
        <title>UK ETA Guide - Complete Information & Requirements</title>
        <meta
          name="description"
          content="Complete guide to UK ETA (Electronic Travel Authorisation): eligibility requirements, application process, benefits, and everything you need to know before traveling to the UK."
        />
        <meta
          property="og:title"
          content="UK ETA Guide - Complete Information & Requirements"
        />
        <meta
          property="og:description"
          content="Complete guide to UK ETA (Electronic Travel Authorisation): eligibility requirements, application process, benefits, and everything you need to know before traveling to the UK."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/eta-guide" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="UK ETA Guide - Complete Information & Requirements"
        />
        <meta
          name="twitter:description"
          content="Complete guide to UK ETA (Electronic Travel Authorisation): eligibility requirements, application process, benefits, and everything you need to know before traveling to the UK."
        />
      </Helmet> */}
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Complete <span className="text-primary">UK ETA Guide</span>
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Everything you need to know about the UK Electronic Travel
                Authorisation (ETA) - eligibility, benefits, requirements, and
                application process.
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
            <div className="max-w-4xl mx-auto mb-16" id="what-is-eta">
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
            <div className="max-w-5xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={londonImg}
                  alt="Travellers looking at london clock tower"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* ETA Rollout Timeline */}
            <div className="mb-16" id="timeline">
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

            {/* Who Is Eligible */}
            <div className="mb-16" id="eligibility">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Who Is Eligible to Apply for a UK ETA?
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                All eligible nationalities (A–Z)
              </p>

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

            {/* Who Doesn't Need */}
            <div className="mb-16" id="exemptions">
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

            {/* What You Can Do with ETA */}
            <div className="mb-16" id="benefits">
              <div className="max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What You Can Do with a UK ETA
                </h2>
                <p className="text-lg text-muted-foreground">
                  The UK ETA is intended for short stays. It allows you to
                  travel to the UK for a range of permitted reasons, as long as
                  you meet the eligibility rules set by the UK government and
                  the standard visitor conditions.
                </p>
              </div>

              {/* Activities Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <Card
                      key={index}
                      className="overflow-hidden group bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {activity.points.map((point, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary mt-1 flex-shrink-0">
                                •
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        {activity.note && (
                          <p className="mt-3 text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
                            {activity.note}
                          </p>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* ETA Validity Section */}
            <div className="max-w-5xl mx-auto mb-16" id="validity">
              <Card className="border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
                  <h2 className="text-3xl font-bold mb-6">
                    ETA Validity and How Long You Can Stay
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The ETA gives you flexibility for short visits, but there
                    are clear time limits you must follow.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Overall Validity
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            A UK ETA is normally valid for up to 2 years, or
                            until your passport expires, whichever comes first
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            The ETA is electronically linked to the passport you
                            used in the application
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            If you receive a new passport, you generally need to
                            apply for a new ETA
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Length of Each Visit
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            As a visitor, you can usually stay in the UK for up
                            to 6 months per trip, if you meet the visitor rules
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Some routes (for example certain short creative
                            work) may have different limits
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Passport Linking
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Your ETA is digital and stored electronically
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Airlines and UK border systems can check its status
                            using your passport details
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            You do not receive a physical visa sticker in your
                            passport
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Multiple Trips Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">
                How Many Trips Can I Make with One ETA?
              </h2>
              <p className="text-muted-foreground mb-6">
                A valid ETA can typically be used for multiple journeys to the
                UK during its validity period. There is no fixed number of
                maximum entries written on the ETA, but each trip must meet the
                rules.
              </p>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <p className="font-semibold mb-4">
                  You can normally travel to the UK again as long as:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      1. Your ETA is still valid
                    </h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-700">
                      <li>• The two-year period has not ended, and</li>
                      <li>• Your passport has not expired</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      2. You respect the visitor time limits
                    </h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-700">
                      <li>
                        • You do not stay longer than allowed for visitors
                      </li>
                      <li>
                        • You are not effectively "living" in the UK through
                        very long or continuous visits
                      </li>
                      <li>
                        • Your overall travel pattern must match genuine visitor
                        behaviour
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      3. Each entry is approved by a border officer
                    </h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-700">
                      <li>• An ETA gives you permission to travel to the UK</li>
                      <li>
                        • It does not guarantee entry. The final decision is
                        always made by a UK border officer on arrival
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-xs text-yellow-700 bg-yellow-50 p-3 rounded">
                  The UK government can change rules or conditions at any time.
                  Always refer to the latest information on GOV.UK before you
                  travel.
                </p>
              </div>
            </div>

            {/* Transit Eligibility */}
            <div className="max-w-4xl mx-auto mb-16" id="transit">
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

            {/* Image - Passport/Travel */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={passportImg}
                  alt="Passport and travel documents"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Main Requirements Section */}
            <div className="mb-16" id="requirements">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                UK ETA Requirements Checklist
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here is a simple checklist to ensure your application goes
                smoothly
              </p>

              {/* Requirements Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requirements.map((req, index) => {
                  const Icon = req.icon;
                  return (
                    <Card
                      key={index}
                      className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-[280px] aspect-video overflow-hidden border-b">
                          <img
                            src={req.image}
                            alt={req.title}
                            className="w-full h-full object-cover transition-transform duration-500"
                          />
                        </div>

                        {/* Main Content */}
                        <div className="p-6 flex flex-col flex-1 space-y-4">
                          {/* Icon + Title */}
                          <div className="flex items-start gap-3">
                            <div className="p-3 bg-primary/10 rounded-xl">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-hero-text">
                              {req.title}
                            </h3>
                          </div>

                          {/* Description */}
                          {req.description && (
                            <p className="text-sm text-foreground/70">
                              {req.description}
                            </p>
                          )}

                          {/* Points */}
                          {req.points?.length > 0 && (
                            <ul className="space-y-2">
                              {req.points.map((point, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-foreground/80"
                                >
                                  <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Spacer pushes note down */}
                          <div className="mt-auto" />

                          {/* Note (always bottom-aligned) */}
                          {req.note && (
                            <div className="pt-4 border-t border-border">
                              <p className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
                                {req.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Photo Requirements Section */}
            <div className="mb-16" id="photo-requirements">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  UK ETA Personal Photo Requirements
                </h2>
                <p className="text-center text-muted-foreground mb-12">
                  The photo helps confirm identity and must meet the following
                  basic standards
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photoRequirements.map((section, index) => (
                    <Card
                      key={index}
                      className="p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                    >
                      <h3 className="font-bold text-lg mb-4 text-primary">
                        {section.category}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={personalPhoto}
                    alt="Airport travel preparation"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* ETA vs Visa Comparison */}
            <div className="mb-16" id="eta-vs-visa">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  UK Visa ETA vs Standard Visitor Visa
                </h2>
                <p className="text-center text-muted-foreground mb-12">
                  Which one do you need? Here's a simple comparison.
                </p>

                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary/10">
                        <tr>
                          <th className="p-4 text-left font-bold">Feature</th>
                          <th className="p-4 text-left font-bold text-primary">
                            UK ETA
                          </th>
                          <th className="p-4 text-left font-bold text-primary">
                            Standard Visitor Visa
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, index) => (
                          <tr
                            key={index}
                            className={`border-t ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="p-4 font-medium">{row.feature}</td>
                            <td className="p-4">
                              {typeof row.eta === "boolean" ? (
                                row.eta ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )
                              ) : (
                                row.eta
                              )}
                            </td>
                            <td className="p-4">
                              {typeof row.visa === "boolean" ? (
                                row.visa ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )
                              ) : (
                                row.visa
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>

            {/* When ETA May Be Refused */}
            <div className="max-w-4xl mx-auto mb-16" id="refusal">
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

            {/* Image - Travel/Airport */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={travelImg}
                  alt="Airport travel preparation"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* How to Check */}
            <div className="max-w-4xl mx-auto mb-16" id="check-eligibility">
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

            {/* CTA */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="bg-gradient-to-r from-primary to-primary/80 text-white border-0">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
                  <p className="text-white/90 mb-6 text-lg">
                    Start your UK ETA application process today
                  </p>
                  <div className="flex justify-center">
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
            <div className="max-w-4xl mx-auto">
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

export default ETAGuide;
