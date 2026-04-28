import { StepProps } from "@/types/form";
import { GovButton } from "@/components/ui/button-variants";
import { useEffect, useState } from "react";
import { COUNTRIES } from "@/utils/countries";

export const Step7ReviewPayment = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isSaving,
}: StepProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    (window as any).dataLayer = (window as any).dataLayer || [];

    const traveller = formData.travellers?.[0];

    console.log("Firing information_review event 2");

    (window as any).dataLayer.push({
      event: "information_review",
      step_number: 3,
      user_info: {
        full_name: traveller?.fullName || "",
        email: traveller?.email || "",
        phone: traveller?.phoneNumber || "",
        nationality: traveller?.nationality || "",
        visa_type: formData.visaType || "",
      },
      timestamp: new Date().toISOString(),
    });
  }, []);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCountryName = (code?: string) =>
    COUNTRIES.find((country) => country.code === code)?.name || code || "";

  // const pushEvent = (data: any) => {
  //   if (typeof window === "undefined") return;
  //   (window as any).dataLayer = (window as any).dataLayer || [];
  //   (window as any).dataLayer.push(data);

  //   console.log("GTM event pushed:", data.event);
  // };

  const handlePayment = async () => {
    if (!formData.travellers.length) {
      setError("No traveller information found");
      return;
    }

    const firstTraveller = formData.travellers[0];
    const phoneNumber = firstTraveller.phoneNumber?.replace(/\D/g, "");
    const countryCode = phoneNumber?.startsWith("+")
      ? phoneNumber.substring(1, 4)
      : "965";

    if (formData.applicationId) {
      localStorage.setItem("currentApplicationId", formData.applicationId);
    }

    const fullNameParts = firstTraveller.fullName?.trim().split(/\s+/) || [];
    const first_name = fullNameParts[0] || "Customer";
    const last_name = fullNameParts.slice(1).join(" ") || "";

    try {
      setIsProcessing(true);
      setError(null);

      // Generate reCAPTCHA Enterprise token
      let recaptchaToken = "";
      try {
        if ((window as any).grecaptcha?.enterprise) {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(
            "6LfpoUYsAAAAAAJI4fRErERmCBIAJ36JJE7majVf",
            { action: "payment" },
          );
        }
      } catch (e) {
        console.warn("reCAPTCHA token generation failed:", e);
      }

      const paymentData = {
        recaptchaToken,
        totalTravellers: formData.travellers.length,
        customer: {
          first_name: first_name,
          last_name: last_name,
          email: firstTraveller.email || "customer@example.com",
          phone: `${phoneNumber}`,
        },
        description: `Egypt eVisa Application - ${
          firstTraveller.fullName || "Traveller"
        }`,
        metadata: {
          ref_number: formData.applicationId,
          passport_number: firstTraveller?.passportNumber,
          client_name: firstTraveller.fullName,
        },
      };

      const totalAmount = 72 * formData.travellers.length;

      const response = await fetch(
        "https://app-ulcsaxetia-uc.a.run.app/api/v1/payment/charge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        },
      );

      const result = await response.json();

      if (result.success && result.data.redirect_url) {
        // const traveller = formData.travellers[0];

        // pushEvent({
        //   event: "purchased",
        //   step_number: 5,
        //   user_info: {
        //     full_name: traveller.fullName || "",
        //     email: traveller.email || "",
        //     phone: traveller.phoneNumber || "",
        //     nationality: traveller.nationality || "",
        //     visa_type: "United Kingdom ETA - 2 years, Multiple entry",
        //   },
        //   ecommerce: {
        //     transaction_id: formData.applicationId,
        //     value: totalAmount,
        //     tax: 0,
        //     currency: "GBP",
        //     items: [
        //       {
        //         item_id: "ETA-UK-2YR",
        //         item_name: "United Kingdom ETA - 2 Years Multiple Entry",
        //         item_category: "Visa Application",
        //         price: totalAmount,
        //         quantity: 1,
        //       },
        //     ],
        //   },
        //   timestamp: new Date().toISOString(),
        // });

        window.location.href = result.data.redirect_url;
      } else {
        throw new Error(result.message || "Payment initiation failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="bg-card p-4 sm:p-8 rounded-xl shadow-card-lg">
          <h3 className=" text-xl sm:text-2xl font-semibold mb-6">
            Review your application
          </h3>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {" "}
                <div>
                  <p className="font-bold text-blue-900">Application type:</p>
                  <p className="text-blue-800">
                    {formData.visaType}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-blue-900">
                    Number of travellers:
                  </p>
                  <p className="text-blue-800">{formData.travellers.length}</p>
                </div>
              </div>
            </div>

            {formData.travellers.map((traveller, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50"
              >
                <h4 className="text-xl font-bold mb-4 text-uk-navy border-b pb-2">
                  Traveller {index + 1}
                </h4>

                <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h5 className="font-semibold text-base mb-3 text-gray-700">
                    Travel information
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-gray-600">
                        Country of departure:
                      </p>
                      <p className="text-gray-900">
                        {getCountryName(traveller?.countryOfDeparture)}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">
                        Expected arrival date:
                      </p>
                      <p className="text-gray-900">
                        {traveller?.expectedArrivalDate}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">
                        Expected departure date:
                      </p>
                      <p className="text-gray-900">
                        {traveller?.expectedDepartureDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h5 className="font-semibold text-base mb-3 text-gray-700">
                    Personal information
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-gray-600">Full name:</p>
                      <p className="text-gray-900">{traveller.fullName}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Nationality:</p>
                      <p className="text-gray-900">
                        {getCountryName(traveller?.nationality)}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Date of birth:</p>
                      <p className="text-gray-900">{traveller?.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Profession:</p>
                      <p className="text-gray-900">{traveller?.jobTitle}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Employer name:</p>
                      <p className="text-gray-900">{traveller?.employerName}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Marital status:</p>
                      <p className="text-gray-900">{traveller?.maritalStatus}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">
                        Passport number:
                      </p>
                      <p className="text-gray-900">
                        {traveller?.passportNumber}
                      </p>
                    </div>
                    {traveller?.otherNationalities && (
                      <div className="col-span-2">
                        <p className="font-bold text-gray-600">
                          Other nationalities:
                        </p>
                        <p className="text-gray-900">
                          {traveller?.otherNationalitiesValue
                            ?.map((code) => getCountryName(code))
                            .join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h5 className="font-semibold text-base mb-3 text-gray-700">
                    Travel history and sponsorship
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-gray-600">
                        Visited Egypt in the past:
                      </p>
                      <p className="text-gray-900">
                        {traveller?.visitedUkBefore ? "Yes" : "No"}
                      </p>
                    </div>
                    {traveller?.visitedUkBefore && (
                      <>
                        <div>
                          <p className="font-bold text-gray-600">
                            Last Egypt entry date:
                          </p>
                          <p className="text-gray-900">
                            {traveller?.lastUkEntryDate}
                          </p>
                        </div>
                        {traveller?.lastUkExitDate && (
                          <div>
                            <p className="font-bold text-gray-600">
                              Last Egypt exit date:
                            </p>
                            <p className="text-gray-900">
                              {traveller?.lastUkExitDate}
                            </p>
                          </div>
                        )}
                        <div className="col-span-1 sm:col-span-2">
                          <p className="font-bold text-gray-600">
                            Where did you stay during your last visit:
                          </p>
                          <p className="text-gray-900">
                            {traveller?.lastUkStayAddress}
                          </p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="font-bold text-gray-600">
                        Hosted in Egypt:
                      </p>
                      <p className="text-gray-900">
                        {traveller?.willBeHostedInUk ? "Yes" : "No"}
                      </p>
                    </div>
                    {traveller?.willBeHostedInUk && (
                      <>
                        <div>
                          <p className="font-bold text-gray-600">Host name:</p>
                          <p className="text-gray-900">{traveller?.hostName}</p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-600">Host type:</p>
                          <p className="text-gray-900">{traveller?.hostType}</p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-600">
                            Host phone number:
                          </p>
                          <p className="text-gray-900">
                            {traveller?.hostPhoneNumber}
                          </p>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <p className="font-bold text-gray-600">
                            Host full address:
                          </p>
                          <p className="text-gray-900">
                            {traveller?.hostFullAddress}
                          </p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="font-bold text-gray-600">
                        Who is paying for your travel expenses:
                      </p>
                      <p className="text-gray-900">
                        {traveller?.travelExpensePayer}
                      </p>
                    </div>
                    {traveller?.travelExpensePayerDetails && (
                      <div className="col-span-1 sm:col-span-2">
                        <p className="font-bold text-gray-600">Payer details:</p>
                        <p className="text-gray-900">
                          {traveller?.travelExpensePayerDetails}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h5 className="font-semibold text-base mb-3 text-gray-700">
                    Contact details
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-bold text-gray-600">Email:</p>
                      <p className="text-gray-900">{traveller?.email}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Phone:</p>
                      <p className="text-gray-900">{traveller?.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">City:</p>
                      <p className="text-gray-900">{traveller?.city}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-600">Country:</p>
                      <p className="text-gray-900">
                        {getCountryName(traveller?.country)}
                      </p>
                    </div>
                    {traveller?.address && (
                      <div className="col-span-1 sm:col-span-2">
                        <p className="font-bold text-gray-600">
                          Current address:
                        </p>
                        <p className="text-gray-900">{traveller?.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                  <h5 className="font-semibold text-base mb-3 text-gray-700">
                    Declaration & consent
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5">
                        {traveller?.termsAccepted ? "✓" : "—"}
                      </span>
                      <div>
                        <p className="font-bold text-gray-600">
                          Terms, conditions & privacy policy
                        </p>
                        <p className="text-gray-900">
                          {traveller?.termsAccepted ? "Accepted" : "Not accepted"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5">
                        {traveller?.nonRefundableAccepted ? "✓" : "—"}
                      </span>
                      <div>
                        <p className="font-bold text-gray-600">
                          Non-refundable policy
                        </p>
                        <p className="text-gray-900">
                          {traveller?.nonRefundableAccepted
                            ? "Accepted"
                            : "Not accepted"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Passport bio page */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-sm text-gray-700">
                        Passport bio page
                      </p>
                      {traveller?.passportPhoto ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary/90">
                          Uploaded
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      )}
                    </div>

                    {traveller?.passportPhoto ? (
                      <div className="space-y-2">
                        <div className="relative h-52 bg-gray-100 rounded-md overflow-hidden border border-gray-200 flex items-center justify-center">
                          {traveller.passportPhoto.type ===
                          "application/pdf" ? (
                            <a
                              href={traveller.passportPhoto.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center justify-center text-gray-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <span className="text-xs truncate">
                                {traveller.passportPhoto.name}
                              </span>
                              <span className="text-xs text-blue-600 underline mt-1">
                                View PDF
                              </span>
                            </a>
                          ) : (
                            <img
                              src={traveller.passportPhoto.url}
                              alt="Passport Preview"
                              className="w-full h-full object-contain p-2"
                            />
                          )}
                        </div>
                        {traveller.passportPhoto.type !== "application/pdf" && (
                          <p className="text-xs text-gray-500 truncate text-center">
                            {traveller.passportPhoto.name ||
                              "passport-document.jpg"}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="h-24 flex items-center justify-center bg-gray-50 rounded-md border-2 border-dashed border-gray-300">
                        <p className="text-sm text-gray-500 text-center px-2">
                          No file uploaded
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground bg-yellow-50 border border-yellow-200 p-3 rounded">
            ⚠️ <strong>Important:</strong> Please review all information
            carefully. Use the Back button to make any changes before proceeding
            to payment.
          </p>
        </div>

        <div className="mt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <GovButton
            onClick={handlePayment}
            className="w-full py-3 text-base"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing payment...
              </div>
            ) : (
              "Proceed to payment"
            )}
          </GovButton>
        </div>

        {/* <div className="bg-card p-4 sm:p-8 rounded-xl shadow-card-lg">
          <h3 className="text-2xl font-semibold mb-6">Payment details</h3>

          <div className="mb-6 bg-primary/10 p-5 rounded-lg border-l-4 border-primary">
            <p className="font-semibold text-xl">
              Total amount: £{72 * formData.travellers.length}.00
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              ETA application fee (£72.00 × {formData.travellers.length}{" "}
              traveller{formData.travellers.length > 1 ? "s" : ""})
            </p>
          </div>

          <div className="mt-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            <GovButton
              onClick={handlePayment}
              className="w-full py-3 text-base"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing payment...
                </div>
              ) : (
                "Pay now"
              )}
            </GovButton>
          </div>
        </div> */}

        <div className="flex justify-between">
          <GovButton
            variant="secondary"
            onClick={onBack}
            className="px-8 py-3 text-base"
            disabled={isSaving}
          >
            Back
          </GovButton>
        </div>
      </div>
    </div>
  );
};
