import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  User,
  Plane,
  Shield,
  CreditCard,
  Mail,
  CheckCircle,
} from "lucide-react";
import london_bridge from "@/assets/eta-united-kingdom.jpg";
import passport from "@/assets/eta-passport.jpg";
import personal from "@/assets/eta-personal-photo.jpg";
import travelInfo from "@/assets/eta-travel-info.jpg";
import security from "@/assets/uk-eta-security.jpg";
import credit from "@/assets/eta-payment-method.jpg";
import email from "@/assets/eta-email.jpg";

export const ETARequirementsSection = () => {
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

  return (
    <section className="py-16 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              UK ETA Requirements
            </h2>
            <p className="text-xl text-foreground/70">
              (What You Need Before You Apply)
            </p>
            <p className="text-lg text-foreground/70 mt-4 max-w-3xl mx-auto">
              Here is a simple checklist to ensure your application goes
              smoothly.
            </p>
          </div>

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
      </div>
      <div className="max-w-6xl mx-auto my-12 px-4">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={london_bridge}
            alt="Airport travel preparation"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};
