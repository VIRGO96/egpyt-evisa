import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { nationalities } from "@/utils/nationalities";

export const WhoNeedsETA = () => {
  const travelReasons = [
    "Tourism & holidays",
    "Short business trip",
    "Short term study",
    "Transit through UK airports",
    "Visiting family or friends",
    "Medical treatment",
    "Attending an event",
  ];

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
  };

  return (
    <section className="py-16 md:py-24 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-6">
              Who Needs a UK ETA?
            </h2>
            <p className="text-lg text-foreground/70 mb-6">
              You may need a UK ETA if you are traveling to the United Kingdom
              for:
            </p>
          </div>

          {/* Travel Reasons */}
          <div className="max-w-3xl mx-auto mb-12">
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-8">
                <ul className="grid md:grid-cols-2 gap-4">
                  {travelReasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80">{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col items-center justify-center mt-4">
                  <p className="mt-6 text-sm text-foreground/70">
                    Eligibility depends on your nationality and passport type.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Eligible Nationalities */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-hero-text text-center mb-8">
              All eligible nationalities
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

          {/* Compliance Notes */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Notes for Compliance & Accuracy
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 ml-9">
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>Citizens of Ireland do not require an ETA.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      This list contains the commonly recognized non-visa
                      nationals, who typically require an ETA.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-600">•</span>
                    <span>
                      This list may change as the UK expands the ETA system,
                      applicants should always check GOV.UK.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
