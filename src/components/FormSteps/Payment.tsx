// components/PaymentSection.tsx
import { useState, useEffect, useRef } from "react";
import { GovButton } from "@/components/ui/button-variants";
import { toast } from "sonner";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

interface PaymentSectionProps {
  formData: any;
  setCurrentStep?: (step: number) => void;
}

export const PaymentSection = ({
  formData,
  setCurrentStep,
}: PaymentSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCardReady, setIsCardReady] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);
  const [tapToken, setTapToken] = useState<string | null>(null);
  const hasInitiatedPayment = useRef(false);

  const totalAmount = 72 * formData.travellers.length;

  // When tapToken becomes available → send charge
  useEffect(() => {
    if (isProcessing && tapToken) {
      sendCharge();
    }
  }, [tapToken]);

  // Initialize Tap Card SDK
  useEffect(() => {
    if (typeof window === "undefined" || !window.CardSDK) return;

    const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } =
      window.CardSDK;

    const { unmount } = renderTapCard("card-sdk-id", {
      publicKey: "pk_live_UdiZ0oBK4QPtc9nCOYLSaqzr",
      merchant: { id: "496110" },

      transaction: {
        amount: totalAmount,
        currency: Currencies.GBP,
        reference: formData.applicationId,
        description: "UK ETA Application Fee",
      },

      acceptance: {
        supportedBrands: ["AMERICAN_EXPRESS", "VISA", "MASTERCARD", "MADA"],
        supportedCards: "ALL",
      },

      fields: { cardHolder: true },
      addons: { displayPaymentBrands: true, loader: true, saveCard: false },

      interface: {
        locale: Locale.EN,
        theme: Theme.LIGHT,
        edges: Edges.CURVED,
        direction: Direction.LTR,
      },

      onChange: (data: any) => {
        console.log("Card onChange:", data);
        if (typeof data === "boolean") {
          setIsCardValid(data);
        } else if (data && typeof data.valid === "boolean") {
          setIsCardValid(data.valid);
        }
      },

      onValidInput: (data: any) => {
        if (data === true) {
          setIsCardValid(true);
        }
      },

      onInvalidInput: (data: any) => {
        if (data === true) {
          setIsCardValid(false);
        } else {
          setIsCardValid(true);
        }
      },

      onSuccess: async (data: any) => {
        setTapToken(data.id);
      },

      onError: (err) => {
        console.log("CARD ERROR:", err);
        setError("Card validation failed. Please try again.");
        setIsCardValid(false);
      },

      onReady: () => {
        setIsCardReady(true);
      },
    });

    return () => {
      setIsCardReady(false);
      setIsCardValid(false);
      unmount();
    };
  }, [formData.travellers.length, totalAmount]);

  const pushEvent = (data: any) => {
    if (typeof window === "undefined") return;
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(data);

    console.log("GTM event pushed:", data.event);
  };

  const handlePayment = async () => {
    if (isProcessing || !isCardValid) return;

    setIsProcessing(true);
    setError(null);

    try {
      await window.CardSDK.tokenize();
    } catch (err) {
      console.error("Tokenization error:", err);
      setError("Failed to process card details. Please try again.");
      setIsProcessing(false);
    }
  };

  // useEffect(() => {
  //   if (isCardValid && !hasInitiatedPayment.current) {
  //     pushEvent({
  //       event: "payment_initiated",
  //       step_number: 4,
  //       payment_method: "Credit Card",
  //       value: totalAmount,
  //       currency: "GBP",
  //       timestamp: new Date().toISOString(),
  //     });

  //     hasInitiatedPayment.current = true;
  //   }
  // }, [isCardValid]);

  // Sends payment to backend AFTER token arrives
  const sendCharge = async () => {
    if (!tapToken) return;
    setTapToken(null);

    try {
      const token = tapToken;
      const traveller = formData.travellers[0];

      // Generate reCAPTCHA Enterprise token
      let recaptchaToken = "";
      try {
        if ((window as any).grecaptcha?.enterprise) {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(
            "6LfpoUYsAAAAAAJI4fRErERmCBIAJ36JJE7majVf",
            { action: "payment" }
          );
        }
      } catch (e) {
        console.warn("reCAPTCHA token generation failed:", e);
      }

      const paymentData = {
        token,
        recaptchaToken,
        totalTravellers: formData.travellers.length,
        customer: {
          first_name: traveller.fullName.split(" ")[0] || "",
          last_name: traveller.fullName.split(" ")[1] || "",
          email: traveller.email,
          phone: traveller.phoneNumber,
        },
        metadata: {
          ref_number: formData.applicationId,
          passport_number: traveller.passportNumber,
          client_name: traveller.fullName,
        },
      };

      const response = await fetch(
        "https://app-5kewngke2a-uc.a.run.app/api/v1/payment/charge",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      const result = await response.json();

      if (result.success) {
        const traveller = formData.travellers[0];

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

        localStorage.setItem("currentApplicationId", formData.applicationId);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentStep?.(4);
        localStorage.removeItem("visit-uk-draft");

        toast.success("Payment successful!");
        return;
      } else {
        // pushEvent({
        //   event: "purchase_failed",
        //   step_number: 5,
        //   reason: "Payment failed",
        //   attempted_value: totalAmount,
        //   currency: "GBP",
        //   timestamp: new Date().toISOString(),
        // });

        toast.error("Payment failed or was declined.");
        throw new Error(result.message || "Payment failed");
      }
    } catch (err: any) {
      // pushEvent({
      //   event: "purchase_failed",
      //   step_number: 5,
      //   reason: err?.message || "Payment failed",
      //   attempted_value: totalAmount,
      //   currency: "GBP",
      //   timestamp: new Date().toISOString(),
      // });

      console.error("Payment processing error:", err);
      setError("Payment failed. Please check your card details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white">Payment Details</h3>
        </div>
        <p className="text-white/90 text-sm">
          Secure payment processing with SSL encryption
        </p>
      </div>

      {/* Payment Amount Section */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 bg-primary/5 p-4 sm:p-6 rounded-lg border border-primary/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-lg text-muted-foreground mb-1">
                Total Payment
              </p>
              <p className="text-2xl font-bold text-hero-text">
                £{totalAmount}.00
              </p>
            </div>
            <div className="p-2 bg-success/10 rounded-lg">
              <ShieldCheck className="h-7 w-7 text-success" />
            </div>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              ETA application fee: £72.00 × {formData.travellers.length}{" "}
              traveller{formData.travellers.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Card Payment Form */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-lg font-semibold text-hero-text">
              Card Payment
            </h4>
          </div>

          {/* Tap Card SDK Container - with horizontal scroll for mobile */}
          <div className="bg-white min-[425px]:border border-gray-200 rounded-lg overflow-x-auto">
            <div className="min-[425px]:p-4">
              <div id="card-sdk-id"></div>
            </div>
          </div>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠</span>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Payment Button */}
        <GovButton
          onClick={handlePayment}
          disabled={isProcessing || !isCardReady || !isCardValid}
          className="w-full py-4 text-base font-semibold"
        >
          {!isCardReady
            ? "Loading payment form..."
            : isProcessing
            ? "Processing payment..."
            : !isCardValid
            ? "Complete card details to continue"
            : `Pay £${totalAmount}.00`}
        </GovButton>

        <div className="flex flex-col gap-2 items-center mt-4">
          <p className="mt-4 text-xs text-center text-muted-foreground">
            By proceeding with payment, you agree to the following policies
          </p>
          <div className="grid grid-cols-2 min-[400px]:grid-cols-4 justify-between gap-3">
            <a
              href="/privacy-policy"
              className="text-primary text-xs font-medium hover:text-primary hover:font-bold duration-300 underline mx-1"
            >
              Privacy Policy
            </a>
            <a
              href="/refund-policy"
              className="text-primary text-xs font-medium hover:text-primary hover:font-bold duration-300 underline mx-1"
            >
              Refund Policy
            </a>{" "}
            <a
              href="/terms-and-conditions"
              className="text-primary text-xs font-medium hover:text-primary hover:font-bold duration-300 underline mx-1"
            >
              Terms & Conditions
            </a>{" "}
            <a
              href="/contact-us"
              className="text-primary text-xs font-medium hover:text-primary hover:font-bold duration-300 underline mx-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
