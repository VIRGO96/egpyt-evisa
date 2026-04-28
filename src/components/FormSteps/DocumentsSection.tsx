import { Label } from "@/components/ui/label";
import { TravellerData } from "@/types/form";
import { Upload, CheckCircle2, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { fileService } from "@/services/firebase";
import { calculateAge } from "@/utils/ageRelatedFunctions";
import { toast } from "sonner";

interface DocumentsSectionProps {
  traveller: TravellerData;
  index: number;
  updateTraveller: (
    index: number,
    field: keyof TravellerData,
    value: any
  ) => void;
  errors: { [key: string]: string };
}

export const DocumentsSection = ({
  traveller,
  index,
  updateTraveller,
  errors,
}: DocumentsSectionProps) => {
  const [uploadingPassport, setUploadingPassport] = useState(false);
  const [uploadingParentPassport, setUploadingParentPassport] = useState(false);
  const [uploadingPersonal, setUploadingPersonal] = useState(false);

  const age = calculateAge(traveller.dateOfBirth || "");

  // const pushDocumentSubmittedEvent = (
  //   documentTypes: string[],
  //   stepNumber = 1
  // ) => {
  //   if (typeof window !== "undefined" && (window as any).dataLayer) {
  //     (window as any).dataLayer.push({
  //       event: "document_submitted",
  //       step_number: stepNumber,
  //       document_types: documentTypes,
  //       timestamp: new Date().toISOString(),
  //     });
  //     console.log("✅ Document_submitted event pushed no.2", documentTypes);
  //   }
  // };

  const handleFileUpload = async (
    field: "passportPhoto" | "personalPhoto" | "parentPassportPhoto",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, or PDF)");
      return;
    }

    if (uploadingPassport || uploadingParentPassport || uploadingPersonal) {
      toast.warning(
        "Please wait for the current upload to complete before uploading another file."
      );
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const fileObject = {
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: previewUrl,
      uploaded: false,
      uploading: true,
    };

    updateTraveller(index, field, fileObject);

    try {
      if (field === "passportPhoto") {
        setUploadingPassport(true);
      } else if (field === "parentPassportPhoto") {
        setUploadingParentPassport(true);
      } else {
        setUploadingPersonal(true);
      }

      const applicationId = traveller.applicationId || `temp-${Date.now()}`;

      let uploadResult;
      if (field === "passportPhoto") {
        uploadResult = await fileService.uploadPassportPhoto(
          file,
          applicationId,
          index
        );
      } else if (field === "parentPassportPhoto") {
        uploadResult = await fileService.uploadParentPassportPhoto(
          file,
          applicationId,
          index
        );
      } else {
        uploadResult = await fileService.uploadPersonalPhoto(
          file,
          applicationId,
          index
        );
      }

      const uploadedFileObject = {
        file: file,
        url: uploadResult.url,
        path: uploadResult.path,
        name: uploadResult.name,
        size: uploadResult.size,
        type: uploadResult.type,
        previewUrl: previewUrl,
        uploaded: true,
        uploading: false,
      };

      updateTraveller(index, field, uploadedFileObject);

      if (!traveller.applicationId) {
        updateTraveller(index, "applicationId", applicationId);
      }

      const newTraveller = {
        ...traveller,
        [field]: uploadedFileObject,
      };

      const hasPassport = !!newTraveller.passportPhoto?.uploaded;
      const hasPersonal = !!newTraveller.personalPhoto?.uploaded;
      const hasParent =
        age !== 0 && age < 12
          ? !!newTraveller.parentPassportPhoto?.uploaded
          : true;

      if (hasPassport && hasPersonal && hasParent) {
        const documentTypes = ["Passport Bio Page", "Personal Photo"];
        if (age !== 0 && age < 12) {
          documentTypes.push("Parent Passport Bio Page");
        }

        // pushDocumentSubmittedEvent(documentTypes);
      }
    } catch (error) {
      console.error("❌ Firebase upload failed:", error);

      const errorFileObject = {
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: previewUrl,
        uploaded: false,
        uploading: false,
        error: error.message,
      };

      updateTraveller(index, field, errorFileObject);

      // Show error message
      toast.error(`Upload failed: ${error.message}. Please try again.`);
    } finally {
      if (field === "passportPhoto") {
        setUploadingPassport(false);
      } else if (field === "parentPassportPhoto") {
        setUploadingParentPassport(false);
      } else {
        setUploadingPersonal(false);
      }
    }
  };

  const removeFile = async (
    field: "passportPhoto" | "personalPhoto" | "parentPassportPhoto"
  ) => {
    const fileData = traveller[field] as any;

    if (fileData?.path) {
      try {
        await fileService.deleteFile(fileData.path);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }

    updateTraveller(index, field, null);
  };

  const FileUploadArea = ({
    field,
    label,
    description,
    isUploading,
  }: {
    field: "passportPhoto" | "personalPhoto" | "parentPassportPhoto";
    label: string;
    description?: React.ReactNode;
    isUploading: boolean;
  }) => {
    const fileData = traveller[field] as any;
    const hasFile = fileData?.file || fileData?.url;

    return (
      <div className="space-y-3">
        <Label className="text-base font-semibold">{label} *</Label>
        <p className="text-sm text-muted-foreground">{description}</p>

        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            errors[`t${index}_${field}`]
              ? "border-destructive bg-destructive/5"
              : hasFile
              ? "border-primary/80 bg-primary/20"
              : (uploadingPassport ||
                  uploadingParentPassport ||
                  uploadingPersonal) &&
                !isUploading
              ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
              : "border-input hover:border-primary/50"
          }`}
        >
          {hasFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-primary/80" />
                <div>
                  <p className="text-sm font-medium text-primary/90">
                    {fileData.name || fileData.file?.name}
                  </p>
                  <p className="text-xs text-primary/70">
                    {fileData.size
                      ? `${(fileData.size / 1024 / 1024).toFixed(2)} MB`
                      : fileData.file
                      ? `${(fileData.file.size / 1024 / 1024).toFixed(2)} MB`
                      : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(field)}
                className="text-red-500 hover:text-red-700 p-1"
                disabled={
                  uploadingPassport ||
                  uploadingParentPassport ||
                  uploadingPersonal
                }
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              {isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Uploading to Firebase...
                  </p>
                </div>
              ) : (uploadingPassport ||
                  uploadingParentPassport ||
                  uploadingPersonal) &&
                !isUploading ? (
                <div className="flex flex-col items-center space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Please wait for current upload to complete
                  </p>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG, PDF up to 5MB
                  </p>
                </>
              )}
            </div>
          )}

          {!hasFile &&
            !(
              uploadingPassport ||
              uploadingParentPassport ||
              uploadingPersonal
            ) && (
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={(e) => handleFileUpload(field, e)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={
                  uploadingPassport ||
                  uploadingParentPassport ||
                  uploadingPersonal
                }
              />
            )}
        </div>

        {errors[`t${index}_${field}`] && (
          <p className="text-sm text-destructive">
            {errors[`t${index}_${field}`]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div data-error={`t${index}_passportPhoto`}>
        <FileUploadArea
          field="passportPhoto"
          label="Passport bio page"
          description={
            <div className="text-sm space-y-1">
              <div>• Must be clear without light reflection</div>
              <div>• Showing the 4 corners of the bio page</div>
              <div>• Supported formats: JPEG, PNG or PDF only</div>
              <div>• Maximum size: 5 MB max</div>
            </div>
          }
          isUploading={uploadingPassport}
        />
      </div>

      <div data-error={`t${index}_personalPhoto`}>
        <FileUploadArea
          field="personalPhoto"
          label="Personal photo"
          description={
            <div className="text-sm space-y-1">
              <div>• Must be in high resolution taken by phone camera</div>
              <div>• Showing your full face</div>
              <div>• Must be in plain background</div>
              <div>• No head covering for men</div>
              <div>• No eyeglasses</div>
              <div>• Neutral face without smile</div>
              <div>• Supported formats: JPEG, PNG or PDF only</div>
              <div>• Maximum size: 5 MB max</div>
            </div>
          }
          isUploading={uploadingPersonal}
        />
      </div>

      {age !== undefined && age > 0 && age < 12 && (
        <div data-error={`t${index}_parentPassportPhoto`}>
          <FileUploadArea
            field="parentPassportPhoto"
            label="Parent passport bio page"
            description={
              <div className="text-sm space-y-1">
                <div>• Must be clear without light reflection</div>
                <div>• Showing the 4 corners of the bio page</div>
                <div>• Supported formats: JPEG, PNG or PDF only</div>
                <div>• Maximum size: 5 MB max</div>
              </div>
            }
            isUploading={uploadingParentPassport}
          />
        </div>
      )}
    </div>
  );
};
