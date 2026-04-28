import { useState, useCallback, useEffect } from "react";
import { FormData } from "@/types/form";
import ApplicationService from "@/services/applicationService";

export interface UseApplicationSaveOptions {
  autoSaveInterval?: number; // Auto-save interval in milliseconds
  onSaveSuccess?: (applicationId: string) => void;
  onSaveError?: (error: Error) => void;
}

export interface UseApplicationSaveReturn {
  isSaving: boolean;
  lastSaved: Date | null;
  saveError: string | null;
  saveDraft: (formData: FormData) => Promise<void>;
  submitApplication: (formData: FormData) => Promise<void>;
  clearError: () => void;
}

export const useApplicationSave = (
  options: UseApplicationSaveOptions = {}
): UseApplicationSaveReturn => {
  const LOCAL_STORAGE_KEY = "visit-uk-draft";
  const { autoSaveInterval = 30000, onSaveSuccess, onSaveError } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Modify saveDraft function to include localStorage
  const saveDraft = useCallback(
    async (formData: FormData) => {
      if (isSaving) return;

      try {
        setIsSaving(true);
        setSaveError(null);

        const hadApplicationId = !!formData.applicationId;
        
        const applicationId = await ApplicationService.saveDraft(formData);
        
        const updatedFormData = { ...formData, applicationId };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedFormData));

        setLastSaved(new Date());
        
        if (!hadApplicationId && applicationId) {
          onSaveSuccess?.(applicationId);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to save draft";
        setSaveError(errorMessage);
        onSaveError?.(error instanceof Error ? error : new Error(errorMessage));
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [isSaving, onSaveSuccess, onSaveError]
  );

  // Submit application function
  const submitApplication = useCallback(
    async (formData: FormData) => {
      try {
        setIsSaving(true);
        setSaveError(null);

        let applicationId = formData.applicationId;
        
        if (!applicationId) {
          applicationId = await ApplicationService.saveDraft(formData);
        }

        if (applicationId) {
          await ApplicationService.submitApplication(
            applicationId,
            "pending"
          );
          setLastSaved(new Date());
          onSaveSuccess?.(applicationId);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to submit application";
        setSaveError(errorMessage);
        onSaveError?.(error instanceof Error ? error : new Error(errorMessage));
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [onSaveSuccess, onSaveError]
  );

  // Clear error function
  const clearError = useCallback(() => {
    setSaveError(null);
  }, []);

  return {
    isSaving,
    lastSaved,
    saveError,
    saveDraft,
    submitApplication,
    clearError,
  };
};

export default useApplicationSave;
