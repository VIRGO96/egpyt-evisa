import { Timestamp } from "firebase/firestore";
import { FormData, TravellerData } from "@/types/form";
import axios from "axios";
import { getSecurityHeaders } from "@/utils/apiSecurity";

// ✅ API Base URL - Your Cloud Function endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://app-ulcsaxetia-uc.a.run.app";

export const COLLECTIONS = {
  APPLICATIONS: "applications",
  TRAVELLERS: "travellers",
  PAYMENTS: "payments",
} as const;

export type ApplicationStatus =
  | "pending"
  | "in_process"
  | "approved"
  | "rejected";

export interface StatusHistoryEntry {
  status: ApplicationStatus;
  timestamp: Timestamp;
  note?: string;
}

export interface ApplicationDocument {
  id?: string;
  applicationId: string;
  // status: ApplicationStatus;
  visaType: string;
  totalTravellers: number;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  submittedAt?: Timestamp;
  primaryEmail?: string;
  primaryPhone?: string;

  paymentStatus?: "pending" | "completed" | "failed";
  paymentAmount?: number;
  paymentCurrency?: string;

  // statusHistory?: StatusHistoryEntry[];

  ipAddress?: string;
  userAgent?: string;
}

export interface TravellerDocument
  extends Omit<
    TravellerData,
    "passportPhoto" | "personalPhoto" | "parentPassportPhoto"
  > {
  id?: string;
  applicationId: string;
  travellerIndex: number;

  passportPhotoUrl?: string;
  passportPhotoPath?: string;
  personalPhotoUrl?: string;
  personalPhotoPath?: string;
  parentPassportPhotoUrl?: string;
  parentPassportPhotoPath?: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  sendEmail?: boolean;
  status: ApplicationStatus;
  statusHistory?: StatusHistoryEntry[];
}

export class ApplicationService {
  static generateApplicationId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `UK-ETA-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Create application via secure API endpoint
   */
  static async createApplication(formData: FormData): Promise<string> {
    try {
      // Prepare travellers payload - remove applicationId and File objects
      const travellersPayload = formData.travellers.map((traveller) => {
        const { applicationId, passportPhoto, personalPhoto, parentPassportPhoto, ...travellerData } = traveller as any;
        return {
          ...travellerData,
          // Keep photo URLs if they exist (already uploaded)
          passportPhotoUrl: passportPhoto?.url,
          passportPhotoPath: passportPhoto?.path,
          personalPhotoUrl: personalPhoto?.url,
          personalPhotoPath: personalPhoto?.path,
          parentPassportPhotoUrl: parentPassportPhoto?.url,
          parentPassportPhotoPath: parentPassportPhoto?.path,
        };
      });

      const requestBody = {
        visaType: formData.visaType,
        travellers: travellersPayload,
      };

      // 🔒 Get security headers
      const securityHeaders = await getSecurityHeaders("POST", "/api/v1/application/create", requestBody);

      // ✅ Call Cloud Function API with security headers
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/application/create`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create application");
      }

      const { applicationId } = response.data.data;
      console.log("✅ Application created via API:", applicationId);
      
      return applicationId;
    } catch (error: any) {
      console.error("❌ Error creating application via API:", error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw error;
    }
  }

  /**
   * @deprecated Use createApplication instead - this now calls API
   */
  static async saveTraveller(
    applicationId: string,
    traveller: TravellerData,
    index: number
  ): Promise<void> {
    console.warn("saveTraveller is deprecated - use createApplication API instead");
  }

  /**
   * Update existing application via API
   */
  private static async updateExistingApplication(
    formData: FormData
  ): Promise<void> {
    try {
      const applicationId = formData.applicationId!;

      // Prepare travellers payload
      const travellersPayload = formData.travellers.map((traveller) => {
        const { applicationId: appId, passportPhoto, personalPhoto, parentPassportPhoto, ...travellerData } = traveller as any;
        return {
          ...travellerData,
          passportPhotoUrl: passportPhoto?.url,
          passportPhotoPath: passportPhoto?.path,
          personalPhotoUrl: personalPhoto?.url,
          personalPhotoPath: personalPhoto?.path,
          parentPassportPhotoUrl: parentPassportPhoto?.url,
          parentPassportPhotoPath: parentPassportPhoto?.path,
        };
      });

      const requestBody = {
        travellers: travellersPayload,
      };

      // 🔒 Get security headers
      const securityHeaders = await getSecurityHeaders("PUT", `/api/v1/application/update/${applicationId}`, requestBody);

      // ✅ Call Cloud Function API with security headers
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/application/update/${applicationId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update application");
      }

      console.log("✅ Application updated via API:", applicationId);
    } catch (error: any) {
      console.error("❌ Error updating application via API:", error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw error;
    }
  }

  /**
   * @deprecated Backend handles status updates via webhook
   */
  static async updateApplicationStatus(
    applicationId: string,
    status: ApplicationStatus,
    paymentStatus?: string,
    note?: string
  ): Promise<void> {
    console.warn("updateApplicationStatus is handled by backend webhook");
  }

  /**
   * @deprecated Backend handles submission
   */
  static async submitApplication(
    applicationId: string,
    paymentStatus: string
  ): Promise<void> {
    console.warn("submitApplication is handled by backend");
  }

  /**
   * Get application by ID via API
   */
  static async getApplication(
    applicationId: string
  ): Promise<ApplicationDocument | null> {
    try {
      // 🔒 Get security headers for GET request
      const securityHeaders = await getSecurityHeaders("GET", `/api/v1/application/${applicationId}`, null);

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/application/${applicationId}`,
        { headers: securityHeaders }
      );

      if (!response.data.success) {
        return null;
      }

      return response.data.data.application;
    } catch (error: any) {
      console.error("❌ Error fetching application:", error);
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get travellers for application via API
   */
  static async getTravellers(
    applicationId: string
  ): Promise<TravellerDocument[]> {
    try {
      // 🔒 Get security headers for GET request
      const securityHeaders = await getSecurityHeaders("GET", `/api/v1/application/${applicationId}`, null);

      const response = await axios.get(
        `${API_BASE_URL}/api/v1/application/${applicationId}`,
        { headers: securityHeaders }
      );

      if (!response.data.success) {
        return [];
      }

      return response.data.data.travellers || [];
    } catch (error: any) {
      console.error("❌ Error fetching travellers:", error);
      return [];
    }
  }

  /**
   * @deprecated Direct Firestore queries removed for security
   */
  static async getApplicationsByEmail(
    email: string
  ): Promise<ApplicationDocument[]> {
    console.warn("getApplicationsByEmail requires backend API endpoint");
    return [];
  }

  /**
   * Save draft application
   */
  static async saveDraft(formData: FormData): Promise<string> {
    try {
      if (!formData.applicationId) {
        // Create new application via API
        const applicationId = await this.createApplication(formData);
        formData.applicationId = applicationId;
        return applicationId;
      } else {
        // Update existing application via API
        await this.updateExistingApplication(formData);
        return formData.applicationId;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @deprecated Backend handles status history
   */
  static async getStatusHistory(
    applicationId: string
  ): Promise<StatusHistoryEntry[]> {
    console.warn("getStatusHistory - fetch via getTravellers and check statusHistory field");
    return [];
  }

  /**
   * Send email verification code
   */
  static async sendEmailVerification(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const requestBody = { email };
      const path = "/api/v1/application/send-email-verification";
      
      const securityHeaders = await getSecurityHeaders("POST", path, requestBody);

      const response = await axios.post(
        `${API_BASE_URL}${path}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );

      return { success: true, message: response.data.message };
    } catch (error: any) {
      console.error("❌ Send email verification failed:", error);
      throw new Error(
        error.response?.data?.error || "Failed to send verification code"
      );
    }
  }

  /**
   * Verify email code
   */
  static async verifyEmailCode(email: string, code: string): Promise<{ success: boolean; message?: string }> {
    try {
      const requestBody = { email, code };
      const path = "/api/v1/application/verify-email-code";
      
      const securityHeaders = await getSecurityHeaders("POST", path, requestBody);

      const response = await axios.post(
        `${API_BASE_URL}${path}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            ...securityHeaders,
          },
        }
      );

      return { success: true, message: response.data.message };
    } catch (error: any) {
      console.error("❌ Verify email code failed:", error);
      throw new Error(
        error.response?.data?.error || "Invalid verification code"
      );
    }
  }
}

export default ApplicationService;
