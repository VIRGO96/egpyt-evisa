import React from "react";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";

const RefundPolicy: React.FC = () => {
  return (
    <>
      {/* <Helmet>
        <title>Refund Policy United Kingdom ETA</title>
        <meta
          name="description"
          content="We are a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />

        <meta property="og:title" content="Refund Policy United Kingdom ETA" />
        <meta
          property="og:description"
          content="We are a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/refund-policy" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Refund Policy United Kingdom ETA" />
        <meta
          name="twitter:description"
          content="We are a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
      </Helmet> */}
      <Layout>
        <div className="container mx-auto p-4 sm:px-8 py-5 sm:py-8">
          {/* Main Card */}
          <div className="w-full flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-12 md:px-12">
            <div className="row text-sm w-full max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left">
                Refund Policy
              </h1>

              <div>
                <p className="mt-6">
                  <strong>Last Updated:</strong> December 15th, 2025
                </p>

                <p>
                  <br />
                </p>

                <p>
                  <em>
                    This refund policy explains your eligibility for a refund
                    and how the refund process works.
                  </em>
                </p>

                <p>
                  <br />
                </p>

                {/* Index */}
                <div className="flex flex-col gap-4">
                  <p>1. Overview</p>
                  <p>2. Full Refund Eligibility</p>
                  <p>3. Partial Refund Eligibility</p>
                  <p>4. No Refund Eligibility</p>
                  <p>5. How to Request a Refund</p>
                  <p>6. Refund Processing Time</p>
                  <p>7. Contact</p>
                </div>

                <p>
                  <br />
                </p>

                {/* SECTION 1 */}
                <p className="mb-2">
                  <strong>1. Overview</strong>
                </p>
                <p>
                  This policy explains how refunds work for applications
                  submitted through this website.
                </p>
                <p className="mt-2">
                  The refund amount depends on the status of your application.
                </p>

                <p>
                  <br />
                </p>

                {/* SECTION 2 */}
                <p className="mb-2">
                  <strong>2. Full Refund Eligibility (100%)</strong>
                </p>
                <p>
                  You are eligible for a <strong>100% refund</strong> if your
                  application has been received but has{" "}
                  <strong>not been reviewed</strong>.
                </p>

                <ul className="list-disc ml-6 md:ml-8 my-2 flex flex-col gap-1">
                  <li>
                    <p>
                      <strong>Received:</strong> You have completed your form
                      and uploaded your documents. Your application is awaiting
                      review.
                    </p>
                  </li>
                </ul>

                <p>
                  <br />
                </p>

                {/* SECTION 3 */}
                <p className="mb-2">
                  <strong>3. Partial Refund Eligibility (50%)</strong>
                </p>
                <p>
                  You are eligible for a <strong>50% refund</strong> if your
                  application is in the following status:
                </p>

                <ul className="list-disc ml-6 md:ml-8 my-2 flex flex-col gap-1">
                  <li>
                    <p>
                      <strong>Information or documents needed:</strong> We have
                      reviewed your application, but more information or
                      documents are required to continue processing.
                    </p>
                  </li>
                </ul>

                <p>
                  <br />
                </p>

                {/* SECTION 4 */}
                <p className="mb-2">
                  <strong>4. No Refund Eligibility</strong>
                </p>
                <p>
                  You are <strong>not eligible for a refund</strong> if your
                  application has already been reviewed and submitted to the UK
                  government. This includes the following statuses:
                </p>

                <ul className="list-disc ml-6 md:ml-8 my-2 flex flex-col gap-1">
                  <li>
                    <p>
                      <strong>Submitted to the Gov:</strong> Your application
                      has been processed and forwarded to the UK government.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Approved or rejected by the Gov:</strong> The
                      service has been delivered and a final government decision
                      has been made.
                    </p>
                  </li>
                </ul>

                <p className="mt-2">
                  If the government rejects your ETA application,{" "}
                  <strong>no refund is issued</strong>.
                </p>

                <p>
                  <br />
                </p>

                {/* SECTION 5 */}
                <p className="mb-2">
                  <strong>5. How to Request a Refund</strong>
                </p>
                <p>If you are eligible, follow these steps:</p>

                <ul className="list-disc ml-6 md:ml-8 my-2 flex flex-col gap-1">
                  <li>Send an email to our support team</li>
                  <li>Provide your registered email address</li>
                  <li>Provide your full name</li>
                  <li>Provide your application reference number</li>
                  <li>Explain your reason for requesting a refund</li>
                </ul>

                <p>
                  <br />
                </p>

                {/* SECTION 6 */}
                <p className="mb-2">
                  <strong>6. Refund Processing Time</strong>
                </p>
                <p>
                  Please allow up to <strong>3 business days</strong> for us to
                  process the refund.
                </p>
                <p className="mt-2">
                  After refund approval, refunds may take up to{" "}
                  <strong>15 business days</strong> to appear in your account.
                </p>
                <p className="mt-2">
                  If you do not see the refund after{" "}
                  <strong>18 business days</strong>, please contact your bank or
                  card issuer before reaching out to us.
                </p>

                <p>
                  <br />
                </p>

                {/* SECTION 7 */}
                <p className="mb-2">
                  <strong>7. Contact</strong>
                </p>
                <div className="flex flex-col gap-1">
                  <p>
                    If you have questions about this refund policy, contact us:
                  </p>
                  <p>
                    <span>Email: </span>
                    <a
                      href="mailto:support@ukevisa.com"
                      className="text-blue-600 hover:underline"
                    >
                      support@ukevisa.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RefundPolicy;
