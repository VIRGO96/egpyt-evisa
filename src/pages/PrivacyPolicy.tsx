import React from "react";
import { Layout } from "../components/Layout";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      {/* <Helmet>
        <title>Privacy Policy | Visit UK</title>
        <meta
          name="description"
          content="Learn how we collect, use, protect, and retain personal information. We provide private ETA-related assistance and are not affiliated with the UK Government."
        />

        <meta property="og:title" content="Privacy Policy | Visit UK" />
        <meta
          property="og:description"
          content="Learn how we collect, use, protect, and retain personal information. We provide private ETA-related assistance and are not affiliated with the UK Government."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visit-uk.com/privacy-policy" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Visit UK" />
        <meta
          name="twitter:description"
          content="Learn how we collect, use, protect, and retain personal information. We provide private ETA-related assistance and are not affiliated with the UK Government."
        />
      </Helmet> */}
      <Layout>
        <div className="container mx-auto px-4 sm:px-8 py-5 sm:py-8">
          {/* Main Card */}
          <div className="w-full flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-4 py-12 md:px-12">
            <div className="row text-sm w-full max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Privacy Policy
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
                    This Privacy Policy explains how{" "}
                    <strong>M&M United Group LLC </strong> ("Company", "we",
                    "us", or "our") collect, use, store, disclose, and protect
                    personal data when you access or use our website, services,
                    or related platforms (collectively, the "Website" or
                    "Services").
                  </p>
                  <p className="mt-4">
                    We are committed to protecting your privacy and processing
                    personal data transparently and securely in accordance with
                    the{" "}
                    <strong>
                      General Data Protection Regulation (EU) 2016/679 ("GDPR")
                    </strong>{" "}
                    and applicable data protection laws.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Table of Contents */}
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong className="font-black">1. DATA CONTROLLER</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        2. SCOPE OF THIS PRIVACY POLICY
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        3. PERSONAL DATA WE COLLECT
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        4. LEGAL BASIS FOR PROCESSING (GDPR ARTICLE 6)
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        5. PURPOSE OF DATA PROCESSING
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        6. SPECIAL CATEGORY DATA
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        7. COOKIES AND TRACKING TECHNOLOGIES
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        8. DATA SHARING AND DISCLOSURE
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        9. INTERNATIONAL DATA TRANSFERS
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">10. DATA RETENTION</strong>
                    </p>
                    <p>
                      <strong className="font-black">11. DATA SECURITY</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        12. YOUR RIGHTS UNDER GDPR
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">13. COMPLAINTS</strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        14. CHILDREN'S PRIVACY
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        15. THIRD-PARTY LINKS
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        16. AUTOMATED DECISION-MAKING
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        17. CHANGES TO THIS PRIVACY POLICY
                      </strong>
                    </p>
                    <p>
                      <strong className="font-black">
                        18. CONTACT INFORMATION
                      </strong>
                    </p>
                  </div>
                  <br />
                  <br />

                  {/* Section 1 */}
                  <p>
                    <strong className="font-black">1. Data Controller</strong>
                  </p>

                  <p className="mt-4">
                    For the purposes of GDPR and applicable data protection
                    laws, the data controller is:
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
                  </div>
                  <p className="mt-4">
                    Contact details are provided in Section 18 of this policy.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 2 */}
                  <p>
                    <strong className="font-black">
                      2. Scope of This Privacy Policy
                    </strong>
                  </p>
                  <p className="mt-4">This Privacy Policy applies to:</p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Visitors to our Website</li>
                    <li>Users of our Services</li>
                    <li>Customers who submit information through our forms</li>
                    <li>Individuals who communicate with us electronically</li>
                  </ul>
                  <p className="mt-4">
                    It does not apply to third-party websites or services that
                    may be linked from our Website.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 3 */}
                  <p>
                    <strong className="font-black">
                      3. Personal Data We Collect
                    </strong>
                  </p>
                  <p className="mt-4">
                    We may collect and process the following categories of
                    personal data:
                  </p>

                  <p className="mt-4">
                    <strong>3.1 Information You Provide Directly</strong>
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Full name</li>
                    <li>Date of birth</li>
                    <li>Nationality</li>
                    <li>
                      Passport or identification details (where required for
                      service provision)
                    </li>
                    <li>Contact details (email address, phone number)</li>
                    <li>Billing and payment information</li>
                    <li>Application-related data submitted voluntarily</li>
                  </ul>

                  <p className="mt-4">
                    <strong>3.2 Information Collected Automatically</strong>
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring URLs</li>
                  </ul>

                  <p className="mt-4">
                    <strong>3.3 Communication Data</strong>
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      Emails, messages, and customer support communications
                    </li>
                    <li>Feedback or inquiries submitted through the Website</li>
                  </ul>
                  <p>
                    <br />
                  </p>

                  {/* Section 4 */}
                  <p>
                    <strong className="font-black">
                      4. Legal Basis for Processing (GDPR Article 6)
                    </strong>
                  </p>
                  <p className="mt-4">
                    We process personal data only when a lawful basis applies,
                    including:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      <strong>Contractual necessity</strong> – to provide
                      requested services
                    </li>
                    <li>
                      <strong>Consent</strong> – where explicitly given by the
                      user
                    </li>
                    <li>
                      <strong>Legal obligation</strong> – to comply with laws
                      and regulations
                    </li>
                    <li>
                      <strong>Legitimate interests</strong> – to operate,
                      secure, and improve our services
                    </li>
                  </ul>
                  <p className="mt-4">
                    Where processing is based on consent, you may withdraw
                    consent at any time.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 5 */}
                  <p>
                    <strong className="font-black">
                      5. Purpose of Data Processing
                    </strong>
                  </p>
                  <p className="mt-4">
                    We use personal data for the following purposes:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Providing and managing our Services</li>
                    <li>Processing applications and user requests</li>
                    <li>Verifying information for completeness and accuracy</li>
                    <li>Customer support and communication</li>
                    <li>Fraud prevention and security monitoring</li>
                    <li>Legal and regulatory compliance</li>
                    <li>Improving Website functionality and performance</li>
                  </ul>
                  <p className="mt-4">
                    We do not sell or rent personal data to third parties.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 6 */}
                  <p>
                    <strong className="font-black">
                      6. Special Category Data
                    </strong>
                  </p>
                  <p className="mt-4">
                    Where required for service provision, we may process limited
                    sensitive data (e.g., identification details). Such data is
                    processed only when:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Explicitly provided by the user</li>
                    <li>Necessary for the requested service</li>
                    <li>Protected with enhanced security measures</li>
                  </ul>
                  <p>
                    <br />
                  </p>

                  {/* Section 7 */}
                  <p>
                    <strong className="font-black">
                      7. Cookies and Tracking Technologies
                    </strong>
                  </p>
                  <p className="mt-4">
                    We use cookies and similar technologies to:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Enable core Website functionality</li>
                    <li>Improve user experience</li>
                    <li>Analyze Website traffic</li>
                  </ul>
                  <p className="mt-4">
                    Users may manage or disable cookies through browser
                    settings. For more information, please refer to our Cookie
                    Policy (if applicable).
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 8 */}
                  <p>
                    <strong className="font-black">
                      8. Data Sharing and Disclosure
                    </strong>
                  </p>
                  <p className="mt-4">
                    We may share personal data only when necessary and limited
                    to:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      Trusted service providers (e.g., hosting, payment
                      processors)
                    </li>
                    <li>Technical and customer support partners</li>
                    <li>
                      Legal or regulatory authorities when required by law
                    </li>
                  </ul>
                  <p className="mt-4">
                    All third parties are contractually required to protect
                    personal data and process it only in accordance with our
                    instructions.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 9 */}
                  <p>
                    <strong className="font-black">
                      9. International Data Transfers
                    </strong>
                  </p>
                  <p className="mt-4">
                    As an international service provider, personal data may be
                    transferred outside the European Economic Area (EEA).
                  </p>
                  <p className="mt-4">
                    When such transfers occur, we ensure appropriate safeguards,
                    including:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Standard Contractual Clauses (SCCs)</li>
                    <li>Adequate security and confidentiality measures</li>
                  </ul>
                  <p>
                    <br />
                  </p>

                  {/* Section 10 */}
                  <p>
                    <strong className="font-black">10. Data Retention</strong>
                  </p>
                  <p className="mt-4">
                    We retain personal data only for as long as necessary to:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      Fulfill the purposes outlined in this Privacy Policy
                    </li>
                    <li>Comply with legal and regulatory obligations</li>
                    <li>Resolve disputes and enforce agreements</li>
                  </ul>
                  <p className="mt-4">
                    Once retention is no longer required, data is securely
                    deleted or anonymized.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 11 */}
                  <p>
                    <strong className="font-black">11. Data Security</strong>
                  </p>
                  <p className="mt-4">
                    We implement appropriate technical and organizational
                    measures to protect personal data, including:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>Encryption and secure storage</li>
                    <li>Restricted access controls</li>
                    <li>Secure servers and network protections</li>
                    <li>Regular security reviews</li>
                  </ul>
                  <p className="mt-4">
                    Despite our efforts, no system is completely secure. Users
                    acknowledge and accept this risk.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 12 */}
                  <p>
                    <strong className="font-black">
                      12. Your Rights Under GDPR
                    </strong>
                  </p>
                  <p className="mt-4">
                    If you are located in the EU/EEA, you have the following
                    rights:
                  </p>
                  <ul className="flex flex-col gap-2 mt-2 px-12 list-disc pl-6">
                    <li>
                      <strong>Right of access</strong> – obtain a copy of your
                      data
                    </li>
                    <li>
                      <strong>Right to rectification</strong> – correct
                      inaccurate data
                    </li>
                    <li>
                      <strong>Right to erasure</strong> – request deletion
                      ("right to be forgotten")
                    </li>
                    <li>
                      <strong>Right to restrict processing</strong>
                    </li>
                    <li>
                      <strong>Right to data portability</strong>
                    </li>
                    <li>
                      <strong>Right to object to processing</strong>
                    </li>
                    <li>
                      <strong>Right to withdraw consent</strong> at any time
                    </li>
                  </ul>
                  <p className="mt-4">
                    Requests may be submitted using the contact details below.
                    We may require identity verification.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 13 */}
                  <p>
                    <strong className="font-black">13. Complaints</strong>
                  </p>
                  <p className="mt-4">
                    You have the right to lodge a complaint with a supervisory
                    authority in your country of residence if you believe your
                    data protection rights have been violated.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 14 */}
                  <p>
                    <strong className="font-black">
                      14. Children's Privacy
                    </strong>
                  </p>
                  <p className="mt-4">
                    Our Website and Services are not intended for individuals
                    under the age of 18. We do not knowingly collect personal
                    data from minors.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 15 */}
                  <p>
                    <strong className="font-black">
                      15. Third-Party Links
                    </strong>
                  </p>
                  <p className="mt-4">
                    The Website may contain links to third-party websites. We
                    are not responsible for their privacy practices or content.
                    Users should review third-party privacy policies
                    independently.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 16 */}
                  <p>
                    <strong className="font-black">
                      16. Automated Decision-Making
                    </strong>
                  </p>
                  <p className="mt-4">
                    We do not use automated decision-making or profiling that
                    produces legal or similarly significant effects on users.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 17 */}
                  <p>
                    <strong className="font-black">
                      17. Changes to This Privacy Policy
                    </strong>
                  </p>
                  <p className="mt-4">
                    We reserve the right to update this Privacy Policy at any
                    time. Changes will be posted on this page with a revised
                    "Last Updated" date.
                  </p>
                  <p className="mt-4">
                    Continued use of the Website constitutes acceptance of the
                    updated Privacy Policy.
                  </p>
                  <p>
                    <br />
                  </p>

                  {/* Section 18 */}
                  <p>
                    <strong className="font-black">
                      18. Contact Information
                    </strong>
                  </p>
                  <p className="my-4">
                    For privacy-related inquiries, data requests, or legal
                    notices, please contact:
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                    <p className="font-semibold text-gray-900">
                      M&M United Group LLC
                    </p>
                    <p className="text-gray-700 flex items-start gap-2">
                      <span>📍</span>
                      <span>
                        Abdulaziz Hamad Al Saqer St, Block 12, Building 23, Unit
                        4 Qiblah, Kuwait
                      </span>
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

export default PrivacyPolicy;
