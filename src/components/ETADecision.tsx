import { Card, CardContent } from "./ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import etaPhoneMockup from "@/assets/eta-uk-mockup.jpg";

export const ETADecision = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-hero-bg/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              UK ETA Decision
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              After the application is processed, you'll receive a decision by
              email
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Approval Card */}
            <Card className="border-success/30 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 bg-success/10 rounded-lg shrink-0">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-success mb-3">
                      Approval
                    </h3>
                    <div className="space-y-2 text-foreground/70 text-sm leading-relaxed">
                      <p>
                        When an ETA application is approved, the applicant
                        receives a confirmation email with the authorization
                        details. The ETA is automatically linked to the passport
                        used during the application, which means travelers do
                        not need to carry a printed document or show proof at
                        the UK border. Airline staff and border officials can
                        verify the authorization electronically by scanning the
                        passport.
                      </p>
                      <p>
                        The ETA remains valid for two years or until the
                        associated passport expires, whichever comes first.
                        During this period, travelers may enter the UK multiple
                        times without reapplying, with each stay permitted for
                        up to six months. The approval allows visitors to travel
                        for purposes such as tourism, business, short-term
                        study, or visiting family and friends, providing
                        flexibility and convenience for frequent travelers.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rejection Card */}
            <Card className="border-destructive/30 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="p-3 bg-destructive/10 rounded-lg shrink-0">
                    <XCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-destructive mb-3">
                      Rejection
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      If an ETA application is refused, the applicant is
                      informed of the decision by email. While the process is
                      generally straightforward, rejections can occur for
                      various reasons. These may include not meeting the
                      eligibility requirements, providing incorrect or
                      incomplete information, or concerns raised during security
                      and background checks. A refusal does not necessarily
                      prevent the individual from traveling to the UK, but it
                      does mean that a standard visa application may be required
                      instead. Depending on the traveler’s purpose and length of
                      stay, this could involve applying for a visitor visa,
                      study visa, or another category that aligns with their
                      circumstances. Applicants are encouraged to review their
                      information carefully before submitting an ETA request, as
                      accuracy and completeness help reduce the likelihood of
                      delays or refusals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
