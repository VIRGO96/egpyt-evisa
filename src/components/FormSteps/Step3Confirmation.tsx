import { FormData } from "@/types/form";
import { GovButton } from "@/components/ui/button-variants";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface Step8Props {
  formData: FormData;
  resetForm: () => void;
}
export const Step8Confirmation = ({ formData, resetForm }: Step8Props) => {
  const hasPushedEventRef = useRef(false);

  const totalAmount = 72 * formData.travellers.length;

  // GTM push helper
  const pushEvent = (data: any) => {
    if (typeof window === "undefined") return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(data);

    console.log("GTM final event pushed:", data.event);
  };

  useEffect(() => {
    if (hasPushedEventRef.current) return;

    const traveller = formData?.travellers?.[0];
    if (!traveller || !formData?.applicationId) return;

    pushEvent({
      event: "purchased",
      step_number: 5,
      user_info: {
        full_name: traveller.fullName || "",
        email: traveller.email || "",
        phone: traveller.phoneNumber || "",
        nationality: traveller.nationality || "",
        visa_type: "United Kingdom ETA - 2 years, Multiple entry",
      },
      ecommerce: {
        transaction_id: formData.applicationId,
        value: totalAmount,
        tax: 0,
        currency: "GBP",
        items: [
          {
            item_id: "ETA-UK-2YR",
            item_name: "United Kingdom ETA - 2 Years Multiple Entry",
            item_category: "Visa Application",
            price: totalAmount,
            quantity: 1,
          },
        ],
      },
      timestamp: new Date().toISOString(),
    });

    hasPushedEventRef.current = true;
  }, [formData, totalAmount]);

  return (
    <div>
      <div className="bg-card p-10 rounded-xl shadow-card-lg">
        <div className="bg-primary/10 border-l-4 border-primary p-6 mb-8 rounded-lg">
          <div className="flex items-start space-x-4">
            <CheckCircle2 className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-3">
                Thank you!
              </h2>
              <p className="text-base text-foreground leading-relaxed">
                Your UK ETA application has been successfully submitted and is
                now being processed.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-primary/10 p-6 rounded-lg border-l-4 border-primary">
            <h3 className="text-lg font-semibold mb-3">
              Application reference
            </h3>
            <p className="text-2xl font-mono font-bold text-primary break-all">
              {formData?.applicationId || "N/A"}
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Please save this reference number for tracking your application.
            </p>
          </div>
          <div className="bg-muted/30 border border-border p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  You will receive a confirmation email.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Your application will be reviewed and you will receive a
                  decision within 3 days
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  You can contact us with the reference number to inquire about
                  your application support@ukevisa.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  If you dont receive an email from us, please check your
                  spam/junk folder before contacting us
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center pt-2">
            <GovButton className="px-10 py-3 text-base" onClick={resetForm}>
              Go back to home
            </GovButton>
          </div>
        </div>
      </div>
    </div>
  );
};
