import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  GraduationCap,
  Palette,
  Plane,
  Clock,
  CreditCard,
  Calendar,
  Globe,
} from "lucide-react";
import businessImg from "@/assets/business-activities-eta.jpg";
import tourismImg from "@/assets/tourism-uk-eta.jpg";
import clockTower from "@/assets/clocktower-london-eta.jpg";
import academicImg from "@/assets/london-clocktower-eta.jpg";
import creativeImg from "@/assets/creative-workers-eta.jpg";
import transitImg from "@/assets/transit-uk-eta.jpg";
import travelImg from "@/assets/london-eta.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function Benefits() {
  const activities = [
    {
      title: "Holidays and City Breaks",
      icon: Users,
      image: tourismImg,
      points: [
        "Visit London, Edinburgh, Cardiff, Belfast and other destinations across the UK",
        "Enjoy sightseeing, shopping and cultural attractions",
        "Take repeated weekend breaks or longer holidays while your ETA is valid",
      ],
    },
    {
      title: "Visiting Family and Friends",
      icon: Users,
      image: clockTower,
      points: [
        "Visit relatives and friends who live in the UK",
        "Attend weddings, birthdays, graduations and other private events",
        "Make several family visits over the validity of your ETA, as long as you follow the visitor rules",
      ],
    },
    {
      title: "Business Trips and Meetings",
      icon: Briefcase,
      image: businessImg,
      points: [
        "Attend business meetings and conferences",
        "Take part in short-term training or events that are permitted for visitors",
        "Make multiple short business trips while your ETA remains valid",
      ],
      note: "Always check the latest UK government guidance on what types of business activity are allowed as a visitor.",
    },
    {
      title: "Short Study and Courses",
      icon: GraduationCap,
      image: academicImg,
      points: [
        "Attend short courses or study programmes (for example, language courses or summer schools)",
        "Take part in study activities that are permitted for visitors and do not require a full study visa",
      ],
    },
    {
      title: "Certain Short Creative Work",
      icon: Palette,
      image: creativeImg,
      points: [
        "In some cases, and only where the UK rules allow it, an ETA may be used when you are coming to the UK as a creative worker for a short time (for example, performers or artists)",
      ],
      note: "This depends on your circumstances and the route you use. Always consult current official guidance before travelling.",
    },
    {
      title: "Transit Through the UK",
      icon: Plane,
      image: transitImg,
      points: [
        "You are passing through a UK airport",
        "You go through UK border control before reaching your final destination",
        "Having a valid ETA in advance can help your connection go more smoothly if the rules require it",
      ],
    },
  ];

  const whyValueETA = [
    {
      icon: Calendar,
      title: "One Approval, Many Trips",
      description:
        "Once your ETA is granted, you can usually use the same ETA for several short visits within its validity period. Avoid starting a fresh permission-to-travel process every time you want to visit.",
    },
    {
      icon: Globe,
      title: "Digital and Convenient",
      description:
        "Your ETA is stored electronically and linked to your passport. There is no need for a physical label or stamp from the ETA itself. Airlines can often check your permission to travel before boarding.",
    },
    {
      icon: CreditCard,
      title: "Cost-Effective for Frequent Visitors",
      description:
        "For travellers who visit the UK regularly, one ETA used for multiple trips over its validity period can be more convenient and cost-effective than applying for repeated short-term permissions.",
    },
    {
      icon: Clock,
      title: "Flexible for Travel Planning",
      description:
        "With a valid ETA, and subject to the rules, you can arrange last-minute trips to see family or friends, combine leisure and allowed business activities in the same visit, and explore different parts of the UK on separate journeys while your ETA remains valid.",
    },
  ];

  const travelInspiration = [
    "Weekend in London – visit landmarks, museums, theatres and shopping districts",
    "Historic Edinburgh – explore medieval streets, castles and festivals",
    "UK Countryside and Coast – discover lakes, national parks and coastline",
    "Business Visits – attend meetings or conferences that fall within visitor regulations",
  ];

  return (
    <>
      <Helmet>
        <title>Benefits United Kingdom ETA</title>
        <meta
          name="description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />

        {/* Open Graph for Facebook, LinkedIn, WhatsApp */}
        <meta property="og:title" content="Benefits United Kingdom ETA" />
        <meta
          property="og:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/benefits" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Benefits United Kingdom ETA" />
        <meta
          name="twitter:description"
          content="Planning to visit the UK? You’re in the right place. Visit UK offers easy-to-follow information and optional assistance for ETA applications (we not affiliated with the UK government). We’re here to guide you through requirements, answer common questions, and help make your travel experience smooth and hassle-free."
        />
      </Helmet>
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
          {/* Main Content */}
          <section className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Benefits of the UK ETA
                <br />
                <span className="text-primary">
                  (Electronic Travel Authorisation)
                </span>
              </h1>
              <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                A UK ETA is a digital permission to travel to the United
                Kingdom. With a single ETA you can make multiple short trips
                over its validity period, for holidays, business visits, study
                and more – based on the current UK government rules.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <strong>Important:</strong> This website is an independent
                  information resource and is not the UK government. For
                  official guidance and to apply for an ETA, always use the UK
                  government website at GOV.UK.
                </p>
              </div>
            </div>

            {/* What You Can Do Section */}
            <div className="mb-16">
              <div className="max-w-4xl mx-auto mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What You Can Do with a UK ETA
                </h2>
                <p className="text-lg text-muted-foreground">
                  The UK ETA is intended for short stays. It allows you to
                  travel to the UK for a range of permitted reasons, as long as
                  you meet the eligibility rules set by the UK government and
                  the standard visitor conditions.
                </p>
              </div>

              {/* Activities Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <Card
                      key={index}
                      className="overflow-hidden group bg-card/80 backdrop-blur-md border border-border/40 rounded-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
                    >
                      {/* Image Section */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* <div className="absolute top-4 left-4 bg-primary/90 p-2 rounded-full">
                        <Icon className="h-5 w-5 text-white" />
                      </div> */}
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {activity.title}
                        </h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {activity.points.map((point, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary mt-1 flex-shrink-0">
                                •
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        {activity.note && (
                          <p className="mt-3 text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
                            {activity.note}
                          </p>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* ETA Validity Section */}
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
                  <h2 className="text-3xl font-bold mb-6">
                    ETA Validity and How Long You Can Stay
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    The ETA gives you flexibility for short visits, but there
                    are clear time limits you must follow.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Overall Validity
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            A UK ETA is normally valid for up to 2 years, or
                            until your passport expires, whichever comes first
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            The ETA is electronically linked to the passport you
                            used in the application
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            If you receive a new passport, you generally need to
                            apply for a new ETA
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Length of Each Visit
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            As a visitor, you can usually stay in the UK for up
                            to 6 months per trip, if you meet the visitor rules
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Some routes (for example certain short creative
                            work) may have different limits
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Passport Linking
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Your ETA is digital and stored electronically
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            Airlines and UK border systems can check its status
                            using your passport details
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>
                            You do not receive a physical visa sticker in your
                            passport
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Multiple Trips Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6">
                How Many Trips Can I Make with One ETA?
              </h2>
              <p className="text-muted-foreground mb-6">
                A valid ETA can typically be used for multiple journeys to the
                UK during its validity period. There is no fixed number of
                maximum entries written on the ETA, but each trip must meet the
                rules.
              </p>

              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <p className="font-semibold mb-4">
                  You can normally travel to the UK again as long as:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      1. Your ETA is still valid
                    </h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-700">
                      <li>• The two-year period has not ended, and</li>
                      <li>• Your passport has not expired</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      2. You respect the visitor time limits
                    </h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-700">
                      <li>
                        • You do not stay longer than allowed for visitors
                      </li>
                      <li>
                        • You are not effectively "living" in the UK through
                        very long or continuous visits
                      </li>
                      <li>
                        • Your overall travel pattern must match genuine visitor
                        behaviour
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      3. Each entry is approved by a border officer
                    </h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-700">
                      <li>• An ETA gives you permission to travel to the UK</li>
                      <li>
                        • It does not guarantee entry. The final decision is
                        always made by a UK border officer on arrival
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4 text-xs text-yellow-700 bg-yellow-50 p-3 rounded">
                  The UK government can change rules or conditions at any time.
                  Always refer to the latest information on GOV.UK before you
                  travel.
                </p>
              </div>
            </div>

            {/* Why Travelers Value Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Why Travelers Value the UK ETA
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {whyValueETA.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={index}
                      className="p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Image - Travel/Airport */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={travelImg}
                  alt="Airport travel preparation"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Travel Inspiration */}
            <div className="max-w-5xl mx-auto mb-16">
              <Card className="border-primary/20 overflow-hidden">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Travel Inspiration with Your ETA
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Once your ETA is approved, and as long as you follow the
                    rules, you can plan trips such as:
                  </p>
                  <ul className="space-y-3">
                    {travelInspiration.map((item, index) => (
                      <li key={index} className="flex gap-3 items-start">
                        <span className="text-primary font-bold text-lg">
                          •
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600">
                    You can design short trips focused on culture, nature,
                    business or a mix of all three, provided each visit stays
                    within the permitted activities and time limits.
                  </p>
                </div>
              </Card>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-12">
              <Link to="/apply">
                <Button
                  size="lg"
                  className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 hover:shadow-xl"
                >
                  Apply for ETA
                </Button>
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-l-4 border-primary p-6 bg-gray-50">
                <h3 className="font-bold text-lg mb-3">
                  Important Disclaimers
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• This page is for general information only.</li>
                  <li>
                    • We do not represent the UK government or UK Visas and
                    Immigration.
                  </li>
                  <li>
                    • We do not make decisions about ETAs and we do not
                    guarantee that any application will be granted.
                  </li>
                  <li>
                    • Rules about eligibility, activities allowed and stay
                    length can change.
                  </li>
                </ul>
                <p className="mt-4 text-sm font-semibold text-gray-900">
                  For the most accurate and up-to-date information, always check
                  the official UK government website:{" "}
                  <a
                    href="https://www.gov.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GOV.UK
                  </a>
                </p>
              </Card>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
