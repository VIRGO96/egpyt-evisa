import { Card, CardContent } from "./ui/card";
import { CheckCircle, Shield, HelpCircle } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/UK-London-ETA.jpg";


const benefits = [
  "Dedicated customer support",
  "Guidance to avoid common application mistakes",
  "Clear instructions for every step",
  "Mobile-friendly application",
  "Secure encrypted form submission",
  "Expert error check before submitting to authorities",
  "Fast notification of updates",
  "After service support in case you need help related to your ETA",
];

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

export const WhyChooseUs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Why Apply Through Our Service */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-6">
                Why Apply Through Our Service?
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Our service includes
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-base font-medium text-foreground/80">
                        {benefit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* <div className="bg-primary/20"> */}
            <div className="max-w-6xl mx-auto pt-8">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={hero}
                  alt="Airport travel preparation"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          {/* </div> */}

          <div className="max-w-6xl mx-auto mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
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

          {/* Transparency Commitment */}
          <div className="mt-16">
            <Card className="border-primary/30 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-hero-text mb-3">
                      Transparency Commitment
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      We clearly state all costs, disclaimers, and our status as
                      an independent provider.
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
