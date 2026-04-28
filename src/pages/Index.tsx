import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { StepIndicator } from "@/components/StepIndicator";
import { FormData } from "@/types/form";
import { Step1VisaSelection } from "@/components/FormSteps/Step1VisaSelection";
import { Step7ReviewPayment } from "@/components/FormSteps/Step2ReviewPayment";
import { Step8Confirmation } from "@/components/FormSteps/Step3Confirmation";
import { useApplicationSave } from "@/hooks/useApplicationSave";
import { toast } from "sonner";
import { PaymentSection } from "@/components/FormSteps/Payment";

const STEP_LABELS = ["Application form", "Review information", "Payment"];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showDraftBadge, setShowDraftBadge] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    visaType: "",
    travellers: [],
  });
  useEffect(() => {
    const savedVisaType = localStorage.getItem("visaType");
    const savedNationality = localStorage.getItem("nationality");

    if (!savedVisaType && !savedNationality) return;

    setFormData((prev) => {
      let updatedTravellers = [...prev.travellers];

      if (updatedTravellers.length === 0) {
        updatedTravellers = [
          {
            applicationId: "",
            nationality: savedNationality || "",
            fullName: "",
            otherNames: false,
            hasJob: false,
            passportNumber: "",
            dateOfBirth: "",
            otherNationalities: false,
          },
        ];
      } else {
        updatedTravellers[0] = {
          ...updatedTravellers[0],
          nationality: savedNationality || updatedTravellers[0].nationality,
        };
      }
      return {
        ...prev,
        visaType: savedVisaType || prev.visaType,
        travellers: updatedTravellers,
      };
    });

    // Clear values after use
    localStorage.removeItem("visaType");
    localStorage.removeItem("nationality");
  }, []);
  // Firestore integration
  const { saveDraft, submitApplication, isSaving } = useApplicationSave({
    onSaveSuccess: (applicationId) => {
      if (!formData.applicationId && applicationId) {
        const updatedFormData = { ...formData, applicationId };
        setFormData(updatedFormData);
        localStorage.setItem("visit-uk-draft", JSON.stringify(updatedFormData));
      }
    },
    onSaveError: (error) => {
      console.error("❌ Save failed:", error);
    },
  });

  // const fireInformationSubmittedEvent = (data: FormData) => {
  //   try {
  //     (window as any).dataLayer = (window as any).dataLayer || [];

  //     const nationality = data.travellers?.[0]?.nationality || "Unknown";
  //     const travellerCount = data.travellers?.length || 0;
  //     const visaType = data.visaType || "Unknown";

  //     console.log(
  //       "Preparing to fire information_submitted event with data:>",
  //       nationality,
  //       travellerCount,
  //       visaType
  //     );

  //     (window as any).dataLayer.push({
  //       event: "information_submitted",
  //       step_number: 2,
  //       nationality,
  //       traveller_count: travellerCount,
  //       visa_type: visaType,
  //       timestamp: new Date().toISOString(),
  //     });

  //     console.log("🔥 GTM Event Fired: information_submitted");
  //   } catch (err) {
  //     console.error("❌ Failed to push GTM event:", err);
  //   }
  // };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => {
      const newData = { ...prev, ...data };

      if (data.travellers && prev.travellers) {
        newData.travellers = data.travellers.map((newTraveller, index) => {
          const prevTraveller = prev.travellers[index];
          if (prevTraveller) {
            return {
              ...prevTraveller,
              ...newTraveller,
            };
          }
          return newTraveller;
        });
      }

      return newData;
    });
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      try {
        await saveDraft(formData);

        // fireInformationSubmittedEvent(formData);
      } catch (error) {
        console.error("Failed to save before proceeding:", error);
        return;
      }
    }

    if (currentStep === 2) {
      try {
        await submitApplication(formData);
      } catch (error) {
        console.error("Failed to submit application:", error);
        toast.error("Failed to submit application. Please try again.");
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const stepProps = {
    formData,
    updateFormData,
    onNext: handleNext,
    onBack: handleBack,
    isSaving,
    setCurrentStep,
  };

  const handleClearDraft = () => {
    localStorage.removeItem("visit-uk-draft");
    setShowDraftBadge(false);
  };

  const resetForm = () => {
    setFormData({
      visaType: "",
      travellers: [],
    });
    setCurrentStep(1);
    localStorage.removeItem("visit-uk-draft");
    localStorage.removeItem("currentApplicationId");
    setShowDraftBadge(false);
  };

  useEffect(() => {
    const checkDraftStatus = () => {
      const draft = localStorage.getItem("visit-uk-draft");

      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.travellers && parsed.travellers.length > 0) {
          setShowDraftBadge(true);
        } else {
          setShowDraftBadge(false);
        }
      } else {
        setShowDraftBadge(false);
      }
    };

    checkDraftStatus();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "visit-uk-draft") {
        checkDraftStatus();
      }
    };

    const handleCustomStorageChange = () => {
      checkDraftStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "localStorageChange",
        handleCustomStorageChange
      );
    };
  }, []);

  useEffect(() => {
    if (currentStep === 4) {
      setShowDraftBadge(false);
    }
  }, [currentStep]);

  const handleDraftClick = () => {
    const draft = localStorage.getItem("visit-uk-draft");
    if (draft) {
      setFormData(JSON.parse(draft));
      setShowDraftBadge(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tapId = params.get("tap_id");

    if (!tapId) {
      return;
    }

    const applicationId =
      localStorage.getItem("currentApplicationId") || formData.applicationId;

    if (!applicationId) {
      toast.error(
        "Application reference missing. Please start a new application."
      );

      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(
          `https://app-ulcsaxetia-uc.a.run.app/api/v1/payment/payment-status/${tapId}`
        );
        const result = await response.json();

        const status = result?.status || result?.data?.status;
        const successStatuses = ["CAPTURED", "SUCCESS", "AUTHORIZED", "Paid"];

        if (successStatuses.includes(status)) {
          setFormData((prev) => ({
            ...prev,
            applicationId: applicationId,
          }));
          // Move to confirmation page
          setCurrentStep(4);

          // Cleanup
          localStorage.removeItem("currentApplicationId");
          localStorage.removeItem("visit-uk-draft");
          window.history.replaceState({}, "", window.location.pathname);

          toast.success(
            "Payment successful! Your application is being processed."
          );
        } else {
          toast.error("Payment failed or was cancelled.");
          window.history.replaceState({}, "", window.location.pathname);
        }
      } catch (err) {
        toast.error("Payment verification failed");
        window.history.replaceState({}, "", window.location.pathname);
      }
    };

    verify();
  }, [formData.applicationId]);

  return (
    <Layout>
      <div className="container sm:px-8 mb-20 sm:mb-1 px-4 mx-auto py-5 sm:py-8">
        {currentStep < 4 && (
          <div className="mb-8">
            <StepIndicator
              currentStep={currentStep}
              totalSteps={3}
              stepLabels={STEP_LABELS}
            />
          </div>
        )}
        {showDraftBadge && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded flex items-center z-[9999] shadow-lg mb-6">
            <span>You have an incomplete application</span>
            <button
              onClick={handleDraftClick}
              className="ml-2 text-yellow-700 underline hover:text-yellow-900"
            >
              Continue
            </button>
            <button
              onClick={handleClearDraft}
              className="ml-2 text-yellow-700 hover:text-yellow-900"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div>
          {currentStep === 1 && <Step1VisaSelection {...stepProps} />}
          {currentStep === 2 && <Step7ReviewPayment {...stepProps} />}
          {currentStep === 3 && (
            <PaymentSection
              formData={formData}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 4 && (
            <Step8Confirmation formData={formData} resetForm={resetForm} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
