import { Card, CardContent } from "./ui/card";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import etaPhoneMockup from "@/assets/uk-eta-status.png";

export const ProcessingTime = () => {
  const approvalBenefits = [
    "Your ETA is linked electronically to your passport",
    "You may travel to the UK for tourism, short business visits, family visits, medical visits, or transit",
    "You may stay up to 6 months per entry",
    "Your ETA remains valid for 2 years (or until your passport expires)",
    "You may make multiple trips during the validity period",
  ];

  const refusalInfo = [
    "You will receive the official notification by email",
    "We will guide you on how to review your information, so you can understand the next steps",
    "You may need to apply for an ETA again or standard UK visa instead",
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
                ETA Processing Time
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
                Processing times vary depending on the applicant and UK
                authorities.
              </p>
            </div>

            {/* Processing Time Card - Full Width */}
            <div>
              <Card className="border-primary/20 shadow-lg max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-hero-text mb-2">
                        Typical time frame:
                      </h3>
                      <p className="text-foreground/70 leading-relaxed">
                        Most applications are decided within a few minutes, but
                        some may take up to 72 hours or longer if additional
                        checks are required.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-foreground/80 leading-relaxed">
                      We notify you by email as soon as the decision is issued
                      by UK authorities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-hero-text text-center mb-8">
              ETA Application Decision Outcomes
            </h3>

            <div className="grid lg:grid-cols-[65%_35%] gap-8 items-start">
              {/* Two Cards Column */}
              <div className="flex flex-col gap-6">
                {/* Approval Card */}
                <Card className="border-green-200 bg-green-50/50 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-green-900">
                        Approval
                      </h4>
                    </div>

                    <p className="font-semibold text-gray-900 mb-4">
                      If approved:
                    </p>
                    <ul className="space-y-3">
                      {approvalBenefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Refusal Card */}
                <Card className="border-red-200 bg-red-50/50 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-red-100 rounded-lg">
                        <XCircle className="h-8 w-8 text-red-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-red-900">
                        Refusal
                      </h4>
                    </div>

                    <p className="font-semibold text-gray-900 mb-4">
                      If your application is refused:
                    </p>
                    <ul className="space-y-3">
                      {refusalInfo.map((info, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <span className="text-red-600 mt-0.5">•</span>
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Image Column - Full height to match cards */}
              <div className="h-full">
                <div className="h-full rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={etaPhoneMockup}
                    alt="UK ETA Mobile Application"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
