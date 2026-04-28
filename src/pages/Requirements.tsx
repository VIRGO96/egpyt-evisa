import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  User,
  CreditCard,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import passportImg from "@/assets/eta-passport.jpg";
import { Helmet } from "react-helmet-async";

export default function Requirements() {
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

  return (
    <>
      {/* <Helmet>
        <title>Requirements United Kingdom ETA</title>
        <meta
          name="description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />

        <meta property="og:title" content="Requirements United Kingdom ETA" />
        <meta
          property="og:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/requirements" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Requirements United Kingdom ETA" />
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
                <span className="text-primary">UK ETA</span> Requirements
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
                Everything You Need to Know Before Visiting the UK
              </p>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                The United Kingdom is introducing a new Electronic Travel
                Authorisation (ETA) system to make travel smoother and more
                secure. If you're planning a trip to the UK for a short stay,
                you may need to apply for an ETA before you travel.
              </p>
              <p className="max-w-4xl mx-auto text-lg text-muted-foreground text-center leading-relaxed">
                Understanding the UK ETA requirements and the difference between
                the ETA and the Standard Visitor Visa helps you prepare for a
                smooth journey. Always check the latest official guidance before
                you travel, as rules and eligibility can change.
              </p>
            </div>

            {/* <div className="max-w-4xl mx-auto mb-12">
            <p className="text-muted-foreground text-center leading-relaxed">
              Understanding the UK ETA requirements and the difference between
              the ETA and the Standard Visitor Visa helps you prepare for a
              smooth journey. Always check the latest official guidance before
              you travel, as rules and eligibility can change.
            </p>
          </div> */}

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
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                UK ETA Requirements Checklist
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here is a simple checklist to ensure your application goes
                smoothly
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {mainRequirements.map((req, index) => (
                  <Card
                    key={index}
                    className="p-6 group transition-all duration-300 border border-border/50 rounded-2xl 
                   bg-gradient-to-b from-background to-card/70 
                   hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <req.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold">{req.title}</h3>
                      </div>

                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {req.points.map((point, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {req.note && (
                        <p className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
                          {req.note}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* ETA Validity Section */}
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Clock className="h-8 w-8 text-primary" />
                    How Long Is the ETA Valid?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Once approved, the ETA is generally valid for:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        <h4 className="font-bold text-xl">2 years</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        or until your passport expires, whichever comes first
                      </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="h-6 w-6 text-primary" />
                        <h4 className="font-bold text-xl">Multiple visits</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        You can make multiple visits during validity, as long as
                        each visit follows UK visitor rules
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* ETA vs Visa Comparison */}
            <div className="mb-16">
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

            {/* Photo Requirements Section */}
            <div className="mb-16">
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
              </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <h3 className="text-2xl font-bold mb-4">
                  Planning a trip to the UK?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Make sure you check whether you need an ETA before you travel.
                  Preparing early helps ensure a smooth and stress-free journey.
                </p>
                <div className="flex justify-center mb-12">
                  <Link
                    to="/apply"
                    >
                    <Button
                      size="lg"
                      className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 hover:shadow-xl"
                    >
                      Apply for ETA
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-l-4 border-primary p-6 bg-gray-50">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> This page is for general
                  information only and does not replace official UK Government
                  immigration guidance. Visit-UK.com is not affiliated with the
                  UK Government or UK Visas and Immigration (UKVI).
                </p>
              </Card>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
