import { Card, CardContent } from "./ui/card";

export const ApplicationFee = () => {
  const servicesIncluded = [
    "Step-by-step guidance",
    "Form accuracy checks",
    "Document verification",
    "Customer support",
    "Real-time email updates on your application status",
  ];

  return (
    <section className="py-12 md:py-16 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-3">
              ETA Fees
            </h2>
            <p className="text-lg text-foreground/70">
              We clearly display both the official government fee and our
              independent service fee
            </p>
          </div>

          <Card className="border-primary/30 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-3 text-center mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Government ETA Fee</span>
                  <span className="text-xl font-semibold text-hero-text">
                    £20
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">
                    Our Application Support Service Fee
                  </span>
                  <span className="text-xl font-semibold text-hero-text">
                    £52
                  </span>
                </div>

                <div className="pt-3 border-t-2 border-primary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-hero-text">
                      Total Cost
                    </span>
                    <span className="text-2xl font-bold text-primary">£72</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
