import { Layout } from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

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

const FAQsPage = () => {
  return (
    <>
      {/* <Helmet>
        <title>Faqs United Kingdom ETA</title>
        <meta
          name="description"
          content="Visit UK is a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />

        <meta property="og:title" content="Faqs United Kingdom ETA" />
        <meta
          property="og:description"
          content="Visit UK is a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/faqs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Faqs United Kingdom ETA" />
        <meta
          name="twitter:description"
          content="Visit UK is a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
      </Helmet> */}
      <Layout>
        <div className="container mx-auto px-4 sm:px-8 py-5 sm:py-8">
          <div className="relative w-full bg-white rounded-lg overflow-hidden shadow-lg flex justify-center">
            <div className="max-w-3xl w-full px-4 py-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Frequently Asked Questions
                </h1>
                <p className="mt-4 text-muted-foreground text-lg">
                  Find answers to common questions about our ETA application
                  assistance service.
                </p>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FAQsPage;
