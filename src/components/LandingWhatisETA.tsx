import { Card, CardContent } from "./ui/card";
import {
  Clock,
  Mail,
  Globe,
  CheckCircle,
  Plane,
  Shield,
  AlertCircle,
  FileCheck,
  Ban,
  XCircle,
} from "lucide-react";
import { Layout } from "./Layout";
import UKETA from "@/assets/uk-eta-sample.png";

export const WhatIsETA = () => {
  const keyPoints = [
    {
      icon: Shield,
      title: "Strengthening border security",
      description: "Enhanced pre-arrival screening for all travelers",
    },
    {
      icon: CheckCircle,
      title: "Improve pre-arrival screening",
      description: "Security and eligibility checks before arrival",
    },
    {
      icon: Globe,
      title: "Simplify entry for eligible travelers",
      description: "Streamlined process for qualifying visitors",
    },
    {
      icon: FileCheck,
      title: "Align with international systems",
      description: "Similar to systems used by other countries",
    },
  ];

  const allowedActivities = [
    "Visit the UK for tourism or leisure",
    "Attend short business meetings or events",
    "Visit family or friends",
    "Transit through the UK (where applicable)",
    "Attend a short-term study",
  ];

  const notAllowed = [
    "Paid or unpaid employment",
    "Long-term study",
    "Permanent residence",
    "Access to public funds",
    "Staying beyond permitted durations",
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
    {
      feature: "Submission method",
      eta: "Fully online",
      visa: "Personal attendance for biometrics and interview",
    },
    {
      feature: "Supporting documents",
      eta: "Not required",
      visa: "Required",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              What is ETA?
            </h2>
          </div>

          {/* Overview Card */}
          <Card className="shadow-lg border-primary/20">
            <CardContent className="p-8">
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                The United Kingdom Electronic Travel Authorization (UK Visa ETA)  is a
                digital travel authorization issued by the UK government to
                nationals of visa-exempt countries. This mandatory authorization
                must be obtained before traveling to the UK.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                This streamlined electronic system is part of the government's
                digital border control initiative by 2025. The UK ETA supports
                various travel purposes including tourism, family visits,
                business activities, and short-term study programs.
              </p>
            </CardContent>
          </Card>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ETA Approval Example
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={UKETA}
                alt="Airport terminal with luggage"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
        {/* ETA vs Visa Comparison */}
        <div className="mt-48">
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
      </div>
    </section>
  );
};
