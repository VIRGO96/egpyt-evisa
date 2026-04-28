import { StepProps, TravellerData } from "@/types/form";
import { GovButton } from "@/components/ui/button-variants";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, Minus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { VisaInfoCard } from "../ui/VisaInfoCard";
import { DocumentsSection } from "./DocumentsSection";
import { DeclarationSection } from "./DeclarationSection";
import {
  validatePersonalInformation,
  validateAgeSpecificQuestions,
  validateContactDetails,
  validateDocuments,
  validateDeclaration,
} from "@/utils/formValidation";
import { PersonalInformationSection } from "./PersonalInformation";
import { AgeSpecificQuestionsSection } from "./AgeSpecificSection";
import { ContactDetailsSection } from "./ContactDetailSection";
import ApplicationService from "@/services/applicationService";
import { toast } from "sonner";
import { error } from "console";

const VISA_TYPES = ["United Kingdom ETA - 2 years, Multiple entry"];

const createEmptyTraveller = (): TravellerData => ({
  otherNationalities: false,
  fullName: "",
  otherNames: false,
  hasJob: false,
  passportNumber: "",
  dateOfBirth: "",
  nationality: "",
  applicationId: "",
});

export const Step1VisaSelection = ({
  formData,
  updateFormData,
  onNext,
  isSaving,
  setCurrentStep,
}: StepProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "traveller-0",
  ]);
  const paymentCheckedRef = useRef(false);
  const formStarterFired = useRef(false);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<{ [key: number]: boolean }>({});

  // Auto-create first traveller when component mounts
  useEffect(() => {
    if (!formData.travellers || formData.travellers.length === 0) {
      updateFormData({ travellers: [createEmptyTraveller()] });
    }
  }, []);

  useEffect(() => {
    if (VISA_TYPES.length === 1 && !formData.visaType) {
      updateFormData({ visaType: VISA_TYPES[0] });
    }
  }, [formData.visaType, updateFormData]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.travellers || formData.travellers.length === 0) {
      newErrors.travellers = "Add at least one traveller";
    }

    if (!formData.visaType) {
      newErrors.visaType = "Select application type";
    }

    formData.travellers?.forEach((traveller, index) => {
      // Check email verification status
      if (!emailVerificationStatus[index]) {
        newErrors[`t${index}_emailVerification`] = "Email verification is required to continue";
      }

      const personalErrors = validatePersonalInformation(traveller, index);
      const ageErrors = validateAgeSpecificQuestions(traveller, index);
      const contactErrors = validateContactDetails(traveller, index);
      const documentErrors = validateDocuments(traveller, index);
      const declarationErrors = validateDeclaration(traveller, index);

      Object.assign(
        newErrors,
        personalErrors,
        ageErrors,
        contactErrors,
        documentErrors,
        declarationErrors
      );
    });

    setErrors(newErrors);

    // Use the same data instead of stale state
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  const scrollToFirstError = (errorObject: { [key: string]: string }) => {
    setTimeout(() => {
      const firstErrorKey = Object.keys(errorObject)[0];
      if (!firstErrorKey) return;

      const errorElement = document.querySelector(
        `[data-error="${firstErrorKey}"]`
      );

      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const handleContinue = () => {
    const isValid = validate();
    if (isValid) onNext();
  };

  const addTraveller = () => {
    const newTravellers = [
      ...(formData.travellers || []),
      createEmptyTraveller(),
    ];
    updateFormData({ travellers: newTravellers });

    const newIndex = newTravellers.length - 1; // last one
    setOpenAccordions((prev) => [...prev, `traveller-${newIndex}`]);
  };

  const removeTraveller = (index: number) => {
    if (formData.travellers.length > 1) {
      const newTravellers = formData.travellers.filter((_, i) => i !== index);
      updateFormData({ travellers: newTravellers });
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`t${index}_`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);

      if (index === formData.travellers.length - 1) {
        // Remove from open accordions if it was open
        setOpenAccordions(
          openAccordions.filter((item) => item !== `traveller-${index}`)
        );
      }
    }
  };

  const removeMostRecentTraveller = () => {
    if (formData.travellers.length > 1) {
      // Remove the last traveller (most recently added)
      removeTraveller(formData.travellers.length - 1);
    }
  };

  const updateTraveller = (
    index: number,
    field: keyof TravellerData,
    value: any
  ) => {
    if (!formStarterFired.current && !field.toString().includes("country")) {
      formStarterFired.current = true;

      console.log("Firing form_starter event 1");
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "form_starter",
        form_name: "UK ETA Application",
        step_number: 1,
        timestamp: new Date().toISOString(),
      });
    }

    const newTravellers = formData.travellers.map((traveller, i) => {
      if (i === index) {
        return {
          ...traveller,
          [field]: value,
        };
      }
      return traveller;
    });
    updateFormData({ travellers: newTravellers });
    const errorKey = `t${index}_${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  // Check if any traveller has files uploading
  const isAnyUploadInProgress = formData.travellers?.some((traveller) => {
    const passportUploading = traveller.passportPhoto?.uploading;
    const personalUploading = traveller.personalPhoto?.uploading;
    const parentPassportUploading = traveller.parentPassportPhoto?.uploading;
    return passportUploading || personalUploading || parentPassportUploading;
  });

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 w-full max-w-full">
      {/* Form Content - Should be second on mobile, first on desktop */}
      <div className="w-full lg:col-span-8 order-2 lg:order-1">
        <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg w-full max-w-full">
          {Object.keys(errors).length > 0 && (
            <div
              className="bg-destructive/10 border-l-4 border-destructive p-4 mb-6 rounded"
              role="alert"
            >
              <h3 className="font-semibold text-destructive mb-2">
                Please fix the following errors:
              </h3>
              <ul className="list-disc list-inside text-sm text-destructive space-y-1">
                {Object.values(errors).map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 pb-2 border-b">
                Basic information
              </h2>
              <div className="grid md:grid-cols-2 gap-6" data-error="visaType">
                <div>
                  <Label
                    htmlFor="visaType"
                    className="text-base font-semibold mb-2 block"
                  >
                    Application type *
                  </Label>
                  <Select
                    value={formData.visaType}
                    onValueChange={(value) => {
                      updateFormData({ visaType: value });
                      if (errors.visaType) {
                        const newErrors = { ...errors };
                        delete newErrors.visaType;
                        setErrors(newErrors);
                      }
                    }}
                  >
                    <SelectTrigger
                      id="visaType"
                      className={`rounded-lg border-2 ${
                        errors.visaType ? "border-destructive" : "border-input"
                      }`}
                    >
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      {VISA_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.visaType && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.visaType}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="pt-6 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">
                    Travellers
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add all travellers applying for UK ETA (
                    {formData.travellers?.length || 0})
                  </p>
                </div>

                {/* Counter Control Only */}
                <div className="flex items-center justify-end w-full sm:w-auto">
                  <div className="flex items-center gap-2 bg-background border rounded-lg p-1 w-32">
                    <button
                      type="button"
                      onClick={removeMostRecentTraveller}
                      disabled={formData.travellers?.length <= 1}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-sm">
                      {formData.travellers?.length || 0}
                    </span>
                    <button
                      type="button"
                      onClick={addTraveller}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {errors.travellers && (
                <p className="text-sm text-destructive mb-3">
                  {errors.travellers}
                </p>
              )}

              {formData.travellers && formData.travellers.length > 0 && (
                <Accordion
                  type="multiple"
                  value={openAccordions}
                  onValueChange={setOpenAccordions}
                  className="space-y-4"
                >
                  {formData.travellers.map((traveller, index) => (
                    <AccordionItem
                      key={index}
                      value={`traveller-${index}`}
                      className="border-2 rounded-xl bg-muted/30"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-semibold text-lg">
                            <span className="pr-3">Traveller {index + 1}:</span>
                            <span className="text-primary">
                              {traveller.fullName || "Not entered"}
                            </span>
                          </span>

                          {formData.travellers.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeTraveller(index);
                              }}
                              className="text-destructive hover:text-destructive/80 flex items-center gap-1 text-sm font-medium"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className=" px-3 sm:px-5 pb-5">
                        <div className="space-y-8 pt-4">
                          <div className="bg-card p-2 sm:p-6 rounded-lg sm:border">
                            <h3 className="text-lg font-semibold mb-4 text-foreground border-b pb-2">
                              Personal information
                            </h3>
                            <PersonalInformationSection
                              traveller={traveller}
                              index={index}
                              updateTraveller={updateTraveller}
                              errors={errors}
                            />
                            <AgeSpecificQuestionsSection
                              traveller={traveller}
                              index={index}
                              updateTraveller={updateTraveller}
                              errors={errors}
                            />
                          </div>

                          <div className="bg-card p-2 sm:p-6 rounded-lg sm:border">
                            <h3 className="text-lg font-semibold mb-4 text-foreground border-b pb-2">
                              Contact details
                            </h3>
                            <ContactDetailsSection
                              traveller={traveller}
                              index={index}
                              updateTraveller={updateTraveller}
                              setErrors={setErrors}
                              errors={errors}
                              onVerificationChange={(idx, isVerified) => {
                                setEmailVerificationStatus(prev => ({
                                  ...prev,
                                  [idx]: isVerified
                                }));
                              }}
                            />
                          </div>

                          <div className="bg-card p-2 sm:p-6 rounded-lg sm:border">
                            <h3 className="text-lg font-semibold mb-4 text-foreground border-b pb-2">
                              Required documents
                            </h3>
                            <DocumentsSection
                              traveller={traveller}
                              index={index}
                              updateTraveller={updateTraveller}
                              errors={errors}
                            />
                          </div>

                          <div className="bg-card p-2 sm:p-6 rounded-lg sm:border">
                            <h3 className="text-lg font-semibold mb-4 text-foreground border-b pb-2">
                              Declaration & consent
                            </h3>
                            <DeclarationSection
                              traveller={traveller}
                              index={index}
                              updateTraveller={updateTraveller}
                              errors={errors}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 justify-center">
            {/* Add Traveller Button */}
            <GovButton
              type="button"
              onClick={addTraveller}
              size="sm"
              className="flex items-center gap-2 w-44 h-[48px]"
            >
              <Plus className="h-4 w-4" />
              Add traveller
            </GovButton>

            {/* Continue to Review Button */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-t md:static md:p-0 md:border-t-0 md:bg-transparent md:backdrop-blur-none w-full md:w-[176px]">
              <GovButton
                onClick={handleContinue}
                className="py-3 text-base w-full"
                disabled={isSaving || isAnyUploadInProgress}
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Continue"
                )}
              </GovButton>
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full lg:col-span-4 order-1 lg:order-2">
        <VisaInfoCard />
      </div>
    </div>
  );
};
