import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/config/firebase";

export const fileService = {
  async uploadFile(file: File, path: string) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return {
        url: downloadURL,
        path: path,
        name: file.name,
        size: file.size,
        type: file.type,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  },

  // Delete file from Firebase Storage
  async deleteFile(path: string) {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },

  // Upload passport photo
  async uploadPassportPhoto(
    file: File,
    applicationId: string,
    travellerIndex: number
  ) {
    const path = `applications/${applicationId}/traveller-${travellerIndex}/passport-photo`;
    return this.uploadFile(file, path);
  },

    // Upload parent passport photo
  async uploadParentPassportPhoto(
    file: File,
    applicationId: string,
    travellerIndex: number
  ) {
    const path = `applications/${applicationId}/traveller-${travellerIndex}/parent-passport-photo`;
    return this.uploadFile(file, path);
  },

  // Upload personal photo
  async uploadPersonalPhoto(
    file: File,
    applicationId: string,
    travellerIndex: number
  ) {
    const path = `applications/${applicationId}/traveller-${travellerIndex}/personal-photo`;
    return this.uploadFile(file, path);
  },
};
