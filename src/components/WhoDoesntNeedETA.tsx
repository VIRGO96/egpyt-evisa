import { Card, CardContent } from "./ui/card";
import {
  ShieldCheck,
  Plane,
  Stamp,
  Users,
  Building2,
  FileCheck,
} from "lucide-react";

const exemptions = [
  {
    icon: ShieldCheck,
    title: "British or Irish citizens",
    description:
      "Anyone holding a British or Irish passport, including dual nationals, is free to travel to the UK without needing an ETA.",
  },
  {
    icon: FileCheck,
    title: "UK visa holders & residents",
    description:
      "Travelers with a valid UK visa, right of abode, or official permission to live, work, or study do not require an ETA.",
  },
  {
    icon: Users,
    title: "Irish residents & CTA travelers",
    description:
      "Residents of Ireland or those travelling from the Common Travel Area—Guernsey, Jersey, or the Isle of Man—remain exempt from ETA rules.",
  },
  {
    icon: Plane,
    title: "Airport transit",
    description:
      "Passengers who only transit through a UK airport, without crossing border control, are not required to apply for an ETA.",
  },
  {
    icon: Stamp,
    title: "Special passport categories",
    description:
      "Holders of British Overseas Territories Citizen or British National (Overseas) passports are fully exempt from ETA requirements.",
  },
  {
    icon: Building2,
    title: "Additional exceptions",
    details: [
      "Children on official France–UK school trips, and individuals exempt from immigration control such as diplomats, also remain exempt.",
      "A British Overseas Territory Citizen (BOTC) travelling on a BOTC passport.",
      "A person with entry clearance or permission to enter or stay in the UK, including those who are settled.",
      "A person who is exempt from immigration control.",
    ],
  },
];

export const WhoDoesntNeedETA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-hero-bg/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hero-text mb-4">
              Who Doesn't Need an ETA?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Several categories of travelers are exempt from UK ETA
              requirements
            </p>
          </div>

          {/* First row - 3 cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {exemptions.slice(0, 3).map((exemption, index) => {
              const Icon = exemption.icon;
              return (
                <Card
                  key={index}
                  className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-hero-text mb-2 text-lg">
                          {exemption.title}
                        </h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {exemption.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Second row - 2 columns (2 cards + 1 large card) */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column - 2 stacked cards */}
            <div className="flex flex-col gap-6">
              {exemptions.slice(3, 5).map((exemption, index) => {
                const Icon = exemption.icon;
                return (
                  <Card
                    key={index + 3}
                    className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-hero-text mb-2 text-lg">
                            {exemption.title}
                          </h3>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {exemption.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Right column - Large card with bullet points */}
            {(() => {
              const exemption = exemptions[5];
              const Icon = exemption.icon;
              return (
                <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col items-center text-center gap-4 h-full">
                      <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-hero-text mb-2 text-lg">
                          {exemption.title}
                        </h3>
                        {exemption.details && (
                          <ul className="mt-3 text-sm text-foreground/70 leading-relaxed space-y-2 text-left">
                            {exemption.details.map((detail, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-primary mt-0.5">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
