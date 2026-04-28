import { Card, CardContent } from "./ui/card";
import { Mail } from "lucide-react";

export const ImportantInformation = () => {
  return (
    <section className="py-16 md:py-24 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              Need Help with Your UK ETA Application?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Support and guidance for your UK ETA application
            </p>
          </div>

          <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
            <CardContent className="p-8">
              <div className="text-sm text-foreground/70 leading-relaxed whitespace-pre-line">
                <p>
                  If you have general questions about our service or your ETA
                  application submission, our support team is here to help.
                </p>

                <p className="mt-4 flex flex-col gap-0">
                  <strong>Contact our team:</strong>
                  <div>
                    Email:{" "}
                    <a
                      href="mailto:support@ukevisa.com"
                      className="text-primary underline hover:text-primary/80"
                    >
                      support@ukevisa.com
                    </a>
                  </div>
                  <div>
                    Phone:{" "}
                    <a
                      href="+19014031000"
                      className="text-primary underline hover:text-primary/80"
                    >
                      +1 901 403 1000
                    </a>
                  </div>
                  <div>
                    Address:{" "}
                    <small className="text-sm">
                      Abdulaziz Hamad Al Saqer St, Block 12, Building 23, Unit 4
                      Qiblah, Kuwait
                    </small>
                  </div>
                </p>

                <p className="mt-4">
                  We aim to respond to most enquiries within one business day.
                  Please note we cannot give legal or immigration advice, or
                  influence the outcome of your application.
                </p>

                <p className="mt-4 font-semibold">Before you get in touch:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Have your passport number and application reference ready.
                  </li>
                  <li>
                    Check our FAQ section for quick answers to common questions.
                  </li>
                  <li>
                    Remember that decisions are made by UK authorities, not by
                    ukevisa.com.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
