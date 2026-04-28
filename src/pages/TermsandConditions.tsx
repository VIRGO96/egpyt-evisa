import React from "react";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";

const TermsandConditions: React.FC = () => {
  return (
    <>
      {/* <Helmet>
        <title>Terms and Conditions United Kingdom ETA</title>
        <meta
          name="description"
          content="We are a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />

        <meta
          property="og:title"
          content="Terms and Conditions United Kingdom ETA"
        />
        <meta
          property="og:description"
          content="We are a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://visit-uk.com/terms-and-conditions"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Terms and Conditions United Kingdom ETA"
        />
        <meta
          name="twitter:description"
          content="We are a private service provider offering informative resources and application assistance for travellers applying for the UK ETA. We help make your preparation smoother with clear instructions, customer support, and up-to-date travel information (we are not affiliated with the UK government)."
        />
      </Helmet> */}
      <Layout>
        <div className="container mx-auto px-4 sm:px-8 py-5 sm:py-8">
          {/* Main Card */}
          <div className="w-full flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-12 md:px-12">
            <div className="row text-sm w-full max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Terms and Conditions
              </h1>

              <div className="des">
                <div className="terms">
                  <p className="mt-8">
                    <strong>Last Updated:</strong> December 15th, 2025
                  </p>
                  <p>
                    <br />
                  </p>
                  <p className="mt-4">
                    These Terms and Conditions ("Terms") constitute a legally
                    binding agreement between you ("User", "you", or "your") and
                    <strong> M&M United Group LLC </strong> ("Company", "we",
                    "us", or "our"), governing your access to and use of the
                    website, services, and any related platforms operated by the
                    Company (collectively, the "Website" or "Services").
                  </p>
                  <p className="mt-4">
                    By accessing, browsing, or using the Website, you confirm
                    that you have read, understood, and agreed to be bound by
                    these Terms. If you do not agree, you must immediately
                    discontinue use of the Website and Services.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Table of Contents */}
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong className="font-black">
                        1. COMPANY INFORMATION
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        2. SCOPE OF SERVICES
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">3. ELIGIBILITY</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        4. USER RESPONSIBILITIES
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        5. FEES, PAYMENTS, AND TAXES
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        6. NO GUARANTEE AND NO GOVERNMENT AUTHORITY
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        7. INTELLECTUAL PROPERTY RIGHTS
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">8. PROHIBITED USE</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        9. DATA PROTECTION AND GDPR COMPLIANCE
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">10. DATA RETENTION</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        11. THIRD-PARTY SERVICES AND LINKS
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        12. DISCLAIMER OF WARRANTIES
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        13. LIMITATION OF LIABILITY
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">14. RELEASE</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        15. INDEMNIFICATION
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        16. SUSPENSION AND TERMINATION
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">17. FORCE MAJEURE</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        18. GOVERNING LAW AND JURISDICTION
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">19. AMENDMENTS</strong>
                    </p>
                    <p>
                      <strong className="font-black">20. SEVERABILITY</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        21. ENTIRE AGREEMENT
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        22. CONTACT INFORMATION
                      </strong>
                    </p>
                  </div>
                  <br />
                  <br />

                  {/* Section 1 */}
                  <p>
                    <strong className="font-black">
                      1. Company Information
                    </strong>
                  </p>
                  <p className="mt-4">
                    The Website and Services are operated by:
                  </p>
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-gray-900">
                      M&M United Group LLC
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Registered Address:</span>
                      <br />
                      Abdulaziz Hamad Al Saqer St, Block 12, Building 23,
                      <br />
                      Unit 4 Qiblah, Kuwait
                    </p>
                  </div>
                  <p className="mt-4">
                    M&M United Group LLC operates as a{" "}
                    <strong>private commercial entity</strong> and are{" "}
                    <strong>not a government authority</strong>, nor affiliated
                    with any government, embassy, or immigration department
                    unless explicitly stated.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 2 */}
                  <p>
                    <strong className="font-black">2. Scope of Services</strong>
                  </p>
                  <p className="mt-4">
                    The Company provides online information services and visa
                    application assistance, which may include:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Guidance on visa application requirements</li>
                    <li>
                      Review of user-submitted information for completeness and
                      consistency
                    </li>
                    <li>
                      Technical visa application submission assistance where
                      authorized
                    </li>
                    <li>Customer support and status updates</li>
                  </ul>
                  <p className="mt-4">
                    The Company does not issue approvals, visas, permits, or
                    travel authorizations, and does not guarantee outcomes.
                    Final decisions are made exclusively by the relevant issuing
                    authorities.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 3 */}
                  <p>
                    <strong className="font-black">3. Eligibility</strong>
                  </p>
                  <p className="mt-4">
                    By using the Website, you represent and warrant that:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      You are at least 18 years old or have legal capacity under
                      applicable law
                    </li>
                    <li>
                      You are legally permitted to use the Services in your
                      jurisdiction
                    </li>
                    <li>
                      All information you provide is accurate, complete, and
                      truthful
                    </li>
                  </ul>
                  <p className="mt-4">
                    The Company reserves the right to refuse service to any
                    individual at its discretion.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 4 */}
                  <p>
                    <strong className="font-black">
                      4. User Responsibilities
                    </strong>
                  </p>
                  <p className="mt-4">You agree to:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Provide accurate and lawful information</li>
                    <li>Review all submitted data before confirmation</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>
                      Maintain confidentiality of your login or access
                      credentials
                    </li>
                  </ul>
                  <p className="mt-4">
                    You acknowledge that inaccurate or incomplete information
                    may result in rejection or delays, for which the Company
                    bears no responsibility.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 5 */}
                  <p>
                    <strong className="font-black">
                      5. Fees, Payments, and Taxes
                    </strong>
                  </p>
                  <ul className="flex flex-col gap-2 mt-4 px-12 list-disc pl-6">
                    <li>
                      All service fees are clearly disclosed prior to payment
                    </li>
                    <li>
                      Government or third-party fees, where applicable, are
                      separate from Company fees
                    </li>
                    <li>
                      Payments are processed through secure third-party payment
                      providers
                    </li>
                  </ul>
                  <p className="mt-4">
                    Unless otherwise required by law, service fees are
                    non-refundable once processing has begun.
                  </p>
                  <p className="mt-4">
                    You are responsible for any applicable taxes, currency
                    conversion fees, or bank charges imposed by your payment
                    provider.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 6 */}
                  <p>
                    <strong className="font-black">
                      6. No Guarantee and No Government Authority
                    </strong>
                  </p>
                  <p className="mt-4">The Company does not guarantee:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Approval of any application</li>
                    <li>Processing times</li>
                    <li>Acceptance of submitted information by authorities</li>
                  </ul>
                  <p className="mt-4">
                    The Company does not provide legal advice, immigration
                    advice, or official government representation.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 7 */}
                  <p>
                    <strong className="font-black">
                      7. Intellectual Property Rights
                    </strong>
                  </p>
                  <p className="mt-4">
                    All Website content, including text, software, databases,
                    graphics, trademarks, logos, layouts, and designs, is owned
                    or licensed by <strong>M&M United Group LLC </strong> and is
                    protected under applicable intellectual property laws.
                  </p>
                  <p className="mt-4">You may not:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      Copy, reproduce, distribute, or modify Website content
                    </li>
                    <li>Use Company branding without written authorization</li>
                    <li>Reverse engineer or exploit Website software</li>
                  </ul>
                  <p className="mt-4">
                    Unauthorized use may result in legal action.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 8 */}
                  <p>
                    <strong className="font-black">8. Prohibited Use</strong>
                  </p>
                  <p className="mt-4">You agree not to:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Submit false, misleading, or fraudulent information</li>
                    <li>Use the Website for unlawful purposes</li>
                    <li>Attempt unauthorized access to systems or data</li>
                    <li>Interfere with Website security or availability</li>
                    <li>Use automated tools without written permission</li>
                  </ul>
                  <p className="mt-4">
                    Violations may result in immediate suspension or
                    termination.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 9 */}
                  <p>
                    <strong className="font-black">
                      9. Data Protection and GDPR Compliance
                    </strong>
                  </p>
                  <p className="mt-4">
                    The Company processes personal data in accordance with:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>The General Data Protection Regulation (GDPR)</li>
                    <li>Applicable data protection and privacy local laws</li>
                  </ul>
                  <p className="mt-4">
                    Personal data is collected solely for legitimate business
                    purposes, including service provision, legal compliance, and
                    customer support.
                  </p>
                  <p className="mt-4">Users have the right to:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Access their personal data</li>
                    <li>Request correction or deletion</li>
                    <li>Restrict or object to processing</li>
                    <li>Request data portability</li>
                  </ul>
                  <p className="mt-4">
                    Full details are provided in the Company's Privacy Policy,
                    which forms an integral part of these Terms.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 10 */}
                  <p>
                    <strong className="font-black">10. Data Retention</strong>
                  </p>
                  <p className="mt-4">
                    Personal data is retained only for as long as necessary to:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Fulfill contractual obligations</li>
                    <li>Comply with legal requirements</li>
                    <li>Resolve disputes</li>
                    <li>Maintain records of compliance</li>
                  </ul>
                  <p className="mt-4">
                    Data is securely deleted or anonymized thereafter.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 11 */}
                  <p>
                    <strong className="font-black">
                      11. Third-Party Services and Links
                    </strong>
                  </p>
                  <p className="mt-4">
                    The Website may contain links to third-party websites or
                    services. The Company:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Does not control third-party content</li>
                    <li>
                      Is not responsible for third-party policies or practices
                    </li>
                    <li>Makes no warranties regarding third-party services</li>
                  </ul>
                  <p className="mt-4">
                    Use of third-party services is at your own risk.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 12 */}
                  <p>
                    <strong className="font-black">
                      12. Disclaimer of Warranties
                    </strong>
                  </p>
                  <p className="mt-4">
                    The Website and Services are provided on an "as is" and "as
                    available" basis.
                  </p>
                  <p className="mt-4">
                    To the maximum extent permitted by law, the Company
                    disclaims all warranties, including:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Accuracy or completeness of content</li>
                    <li>Availability or uninterrupted access</li>
                    <li>Fitness for a particular purpose</li>
                  </ul>
                  <p>
                    <br />
                  </p>

                  {/* Section 13 */}
                  <p>
                    <strong className="font-black">
                      13. Limitation of Liability
                    </strong>
                  </p>
                  <p className="mt-4">
                    To the fullest extent permitted by law, M&M United Group LLC
                    shall not be liable for:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Application rejections or delays</li>
                    <li>Loss of travel plans, revenue, or opportunities</li>
                    <li>Indirect, incidental, or consequential damages</li>
                  </ul>
                  <p className="mt-4">
                    The Company's total liability shall not exceed the amount
                    paid by you for the Services.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 14 */}
                  <p>
                    <strong className="font-black">14. Release</strong>
                  </p>
                  <p className="mt-4">
                    You hereby release and discharge M&M United Group LLC, its
                    directors, employees, and affiliates from any claims arising
                    from:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Government decisions or actions</li>
                    <li>User-submitted information</li>
                    <li>Use or inability to use the Website</li>
                  </ul>
                  <p>
                    <br />
                  </p>

                  {/* Section 15 */}
                  <p>
                    <strong className="font-black">15. Indemnification</strong>
                  </p>
                  <p className="mt-4">
                    You agree to indemnify and hold harmless M&M United Group
                    LLC against all claims, liabilities, damages, costs, and
                    expenses arising from:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Breach of these Terms</li>
                    <li>Violation of applicable laws</li>
                    <li>Misuse of the Website or Services</li>
                  </ul>
                  <p>
                    <br />
                  </p>

                  {/* Section 16 */}
                  <p>
                    <strong className="font-black">
                      16. Suspension and Termination
                    </strong>
                  </p>
                  <p className="mt-4">The Company reserves the right to:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Suspend or terminate access at any time</li>
                    <li>Refuse or discontinue services without notice</li>
                    <li>Terminate accounts for violations of these Terms</li>
                  </ul>
                  <p className="mt-4">
                    Termination does not affect accrued rights or obligations.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 17 */}
                  <p>
                    <strong className="font-black">17. Force Majeure</strong>
                  </p>
                  <p className="mt-4">
                    The Company shall not be liable for delays or failures
                    caused by events beyond its reasonable control, including
                    but not limited to natural disasters, system failures,
                    government actions, or internet disruptions.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 18 */}
                  <p>
                    <strong className="font-black">
                      18. Governing Law and Jurisdiction
                    </strong>
                  </p>
                  <p className="mt-4">
                    These Terms shall be governed by and construed in accordance
                    with applicable laws.
                  </p>
                  <p className="mt-4">
                    Any disputes shall be subject to the jurisdiction of the
                    competent courts as determined by applicable law.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 19 */}
                  <p>
                    <strong className="font-black">19. Amendments</strong>
                  </p>
                  <p className="mt-4">
                    The Company may update these Terms at any time. Updated
                    versions will be posted on the Website with a revised "Last
                    Updated" date. Continued use constitutes acceptance of the
                    updated Terms.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 20 */}
                  <p>
                    <strong className="font-black">20. Severability</strong>
                  </p>
                  <p className="mt-4">
                    If any provision of these Terms is found invalid or
                    unenforceable, the remaining provisions shall remain in full
                    force and effect.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 21 */}
                  <p>
                    <strong className="font-black">21. Entire Agreement</strong>
                  </p>
                  <p className="mt-4">
                    These Terms, together with the Privacy Policy and any posted
                    notices, constitute the entire agreement between you and M&M
                    United Group LLC regarding use of the Website and Services.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 22 */}
                  <p>
                    <strong className="font-black">
                      22. Contact Information
                    </strong>
                  </p>
                  <p className="mt-4">
                    For questions, concerns, or legal notices, please contact:
                  </p>
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-gray-900">
                      M&M United Group LLC
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <span className="font-medium">📍</span>
                      Abdulaziz Hamad Al Saqer St, Block 12, Building 23, Unit 4
                      Qiblah, Kuwait
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <span>📧</span>
                      <span>
                        Email:{" "}
                        <a
                          href="mailto:support@ukevisa.com"
                          className="text-blue-600 hover:underline"
                        >
                          support@ukevisa.com
                        </a>
                      </span>
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <span>🌐</span>
                      <span>
                        Website:{" "}
                        <a
                          href="mailto:support@ukevisa.com"
                          className="text-blue-600 hover:underline"
                        >
                          https://ukevisa.com
                        </a>
                      </span>
                    </p>
                  </div>
                  <p>
                    <br />
                  </p>
                  <p>
                    <br />
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

export default TermsandConditions;
