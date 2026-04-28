import { TravellerData } from "@/types/form";

interface DeclarationSectionProps {
  traveller: TravellerData;
  index: number;
  updateTraveller: (
    index: number,
    field: keyof TravellerData,
    value: any
  ) => void;
  errors: { [key: string]: string };
}

export const DeclarationSection = ({
  traveller,
  index,
  updateTraveller,
  errors,
}: DeclarationSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Declaration Statement */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-semibold text-xs text-gray-900 mb-3">
          Declaration statement
        </h4>
        <div className="space-y-3 text-xs text-gray-700">
          <p>
            Before submitting your application, please confirm the following:
          </p>
          <ul className="list-disc list-outside ml-5 space-y-2">
            <li>
              You acknowledge that giving false information can lead to your
              application being refused, you may be prosecuted, and you may be
              banned from the UK.
            </li>
            <li>
              If applying on someone else's behalf, you must confirm the
              application is complete and correct with them.
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div data-error={`t${index}_declarationAccepted`}>
          <label
            className={`flex flex-row sm:items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-colors ${
              errors[`t${index}_declarationAccepted`]
                ? "border-destructive bg-destructive/5"
                : "border-input bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <input
              type="checkbox"
              checked={traveller.declarationAccepted || false}
              onChange={(e) =>
                updateTraveller(index, "declarationAccepted", e.target.checked)
              }
              className="w-4 h-4 text-primary rounded flex-shrink-0  self-start mt-1 sm:mt-1"
            />
            <span className="text-xs text-gray-700 text-left font-semibold">
              I confirm that the information provided is correct to the best of
              my knowledge and I understand the consequences of providing false
              information.
            </span>
          </label>
          {errors[`t${index}_declarationAccepted`] && (
            <p className="text-xs text-destructive mt-2">
              {errors[`t${index}_declarationAccepted`]}
            </p>
          )}
        </div>

        <div data-error={`t${index}_termsAccepted`}>
          <label
            className={`flex flex-row sm:items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-colors ${
              errors[`t${index}_termsAccepted`]
                ? "border-destructive bg-destructive/5"
                : "border-input bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <input
              type="checkbox"
              checked={traveller.termsAccepted || false}
              onChange={(e) =>
                updateTraveller(index, "termsAccepted", e.target.checked)
              }
              className="w-4 h-4 text-primary rounded flex-shrink-0 mt-1 sm:mt-1 self-start"
            />
            <span className="text-xs text-gray-700 text-left font-semibold">
              I've read and accept the{" "}
              <a
                href="/privacy-policy"
                className="text-primary font-semibold hover:text-primary hover:font-bold duration-300 underline mx-1"
              >
                Privacy Policy,
              </a>
               <a
                href="/refund-policy"
                className="text-primary font-semibold hover:text-primary hover:font-bold duration-300 underline mx-1"
              >
                Refund Policy,
              </a>
              <a
                href="/terms-and-conditions"
                className="text-primary font-semibold hover:text-primary hover:font-bold duration-300 underline mx-1"
              >
                Terms & Conditions
              </a>
              and
              <a
                href="/cookie-policy"
                className="text-primary font-semibold hover:text-primary hover:font-bold duration-300 underline mx-1"
              >
                Cookie Policy
              </a>
            </span>
          </label>
          {errors[`t${index}_termsAccepted`] && (
            <p className="text-xs text-destructive mt-2">
              {errors[`t${index}_termsAccepted`]}
            </p>
          )}
        </div>

        <div data-error={`t${index}_googlePoliciesAccepted`}>
          <label
            className={`flex flex-row sm:items-start gap-3 cursor-pointer p-4 rounded-lg border-2 transition-colors ${
              errors[`t${index}_googlePoliciesAccepted`]
                ? "border-destructive bg-destructive/5"
                : "border-input bg-muted/30 hover:bg-muted/50"
            }`}
          >
            <input
              type="checkbox"
              checked={traveller.googlePoliciesAccepted || false}
              onChange={(e) =>
                updateTraveller(
                  index,
                  "googlePoliciesAccepted",
                  e.target.checked
                )
              }
              className="w-4 h-4 text-primary rounded flex-shrink-0 mt-1 sm:mt-1 self-start"
            />
            <span className="text-xs text-gray-700 font-semibold text-left">
             By submitting personal information, including passport or identity data, you consent to its use solely for processing your travel/ETA application.
            </span>
          </label>
          {errors[`t${index}_googlePoliciesAccepted`] && (
            <p className="text-xs text-destructive mt-2">
              {errors[`t${index}_googlePoliciesAccepted`]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
