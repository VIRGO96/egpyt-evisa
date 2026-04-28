import { Layout } from "@/components/Layout";
import { LandingHero } from "@/components/LandingHero";
import { WhatIsETA } from "@/components/LandingWhatisETA";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WhoDoesntNeedETA } from "@/components/WhoDoesntNeedETA";
import { ProcessingTime } from "@/components/ProcessingTime";
import { ETADecision } from "@/components/ETADecision";
import { ImportantInformation } from "@/components/ImportantInformation";
import { ApplicationFee } from "@/components/ApplicationFee";
import { WhoNeedsETA } from "@/components/WhoNeedsETA";
import { ETARequirementsSection } from "./ETARequirementsHome";

const Home = () => {
  return (
    <Layout>
      <LandingHero />
      <WhatIsETA />
      <WhoNeedsETA />
      <ETARequirementsSection />
      <ApplicationFee />
      <ProcessingTime />
      <WhyChooseUs />
      <ImportantInformation />
    </Layout>
  );
};

export default Home;
