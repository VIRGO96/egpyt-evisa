import { TravellerData } from "@/types/form";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import validator from "validator";
import { containsMaliciousPatterns } from "./sanitize";

const calculateAge = (dateOfBirth: string): number => {
  if (!dateOfBirth) return 0;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const validatePersonalInformation = (
  traveller: TravellerData,
  index: number
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!traveller.fullName?.trim()) {
    errors[`t${index}_fullName`] = "Full name is required";
  } else if (containsMaliciousPatterns(traveller.fullName)) {
    errors[`t${index}_fullName`] = "Invalid characters detected in name";
  }

  if (!traveller.nationality) {
    errors[`t${index}_nationality`] = "Nationality is required";
  }

  if (!traveller.passportNumber?.trim()) {
    errors[`t${index}_passportNumber`] = "Passport number is required";
  } else if (!/^[A-Z0-9]{6,15}$/.test(traveller.passportNumber.trim())) {
    errors[`t${index}_passportNumber`] =
      "Passport number must be letters and numbers only";
  } else if (containsMaliciousPatterns(traveller.passportNumber)) {
    errors[`t${index}_passportNumber`] = "Invalid characters detected";
  }

  if (!traveller.dateOfBirth) {
    errors[`t${index}_dateOfBirth`] = "Date of birth is required";
  }

  if (typeof traveller.hasJob !== "boolean") {
    errors[`t${index}_hasJob`] = "Have Job is required";
  }

  if (typeof traveller.otherNames !== "boolean") {
    errors[`t${index}_otherNames`] = "Have Other Names is required";
  }

  if (typeof traveller.otherNationalities !== "boolean") {
    errors[`t${index}_otherNationalities`] =
      "Have Other Nationalities is required";
  } else if (
    traveller.otherNationalities === true &&
    (!Array.isArray(traveller.otherNationalitiesValue) ||
      traveller.otherNationalitiesValue.length === 0)
  ) {
    errors[`t${index}_otherNationalitiesValue`] =
      "Please select your other nationalities";
  }

  if (traveller.hasJob) {
    if (!traveller.jobTitle?.trim()) {
      errors[`t${index}_jobTitle`] = "Job title is required when employed";
    } else if (containsMaliciousPatterns(traveller.jobTitle)) {
      errors[`t${index}_jobTitle`] = "Invalid characters detected in job title";
    }
    if (!traveller.employerName?.trim()) {
      errors[`t${index}_employerName`] =
        "Employer name is required when employed";
    } else if (containsMaliciousPatterns(traveller.employerName)) {
      errors[`t${index}_employerName`] = "Invalid characters detected in employer name";
    }
  }

  return errors;
};

export const validateAgeSpecificQuestions = (
  traveller: TravellerData,
  index: number
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  const age = calculateAge(traveller.dateOfBirth);

  if (age < 12 && age > 0 && !traveller.parentName?.trim()) {
    errors[`t${index}_parentName`] =
      "Parent's name is required for travellers under 12";
  }

  if (age >= 16) {
    if (traveller.hasCriminalConviction === undefined) {
      errors[`t${index}_hasCriminalConviction`] =
        "Please answer the criminal conviction question";
    }

    if (traveller.hasCriminalConviction === true) {
      if (!traveller.crimeDetails?.trim()) {
        errors[`t${index}_crimeDetails`] = "Crime details are required";
      }
      if (!traveller.convictionCountry) {
        errors[`t${index}_convictionCountry`] =
          "Conviction country is required";
      }
      if (traveller.sentencedOver12Months === undefined) {
        errors[`t${index}_sentencedOver12Months`] =
          "Please answer the sentence length question";
      }
    }

    if (traveller.hasWarCrimesHistory === undefined) {
      errors[`t${index}_hasWarCrimesHistory`] =
        "Please answer the war crimes/terrorism question";
    }

    if (traveller.hasWarCrimesHistory === true) {
      if (!traveller.warCrimesTypes || traveller.warCrimesTypes.length === 0) {
        errors[`t${index}_warCrimesTypes`] =
          "Please select at least one option";
      }
    }
  }

  return errors;
};

export const validateContactDetails = (
  traveller: TravellerData,
  index: number
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  //Email Validation
  if (!traveller.email?.trim()) {
    errors[`t${index}_email`] = "Email is required";
  } else if (!validator.isEmail(traveller.email)) {
    errors[`t${index}_email`] = "Invalid email format";
  }

  //Phone Number Validation
  const phoneNumber = traveller?.phoneNumber?.trim();
  const countryCode = traveller?.country as CountryCode;

  if (!phoneNumber) {
    errors[`t${index}_phoneNumber`] = "Phone number is required";
  } else {
    try {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, countryCode);

      if (!parsedNumber) {
        errors[`t${index}_phoneNumber`] = "Invalid phone number format.";
      } else {
        if (
          countryCode &&
          parsedNumber.country &&
          parsedNumber.country !== countryCode
        ) {
          errors[`t${index}_phoneNumber`] =
            "Phone number does not match the selected country.";
        } else if (!parsedNumber.isValid()) {
          errors[`t${index}_phoneNumber`] =
            "Phone number is invalid for the selected country.";
        }
      }
    } catch (err) {
      console.error("Phone validation error:", err);
      errors[`t${index}_phoneNumber`] =
        "Unable to validate phone number. Please check the format.";
    }
  }

  //Address validations
  if (!traveller.address?.trim()) {
    errors[`t${index}_address`] = "Home address is required";
  } else if (/^\d+$/.test(traveller.address.trim())) {
    errors[`t${index}_address`] = "Address cannot contain only numbers";
  } else if (!/^[\w\s.,'-]+$/.test(traveller.address.trim())) {
    errors[`t${index}_address`] = "Address contains invalid characters";
  }

  //City, Country, Zip Code validations
  if (!traveller.city?.trim()) {
    errors[`t${index}_city`] = "City is required";
  } else if (/^\d+$/.test(traveller.city.trim())) {
    errors[`t${index}_city`] = "City cannot contain only numbers";
  } else if (!/^[a-zA-Z\s'-]+$/.test(traveller.city.trim())) {
    errors[`t${index}_city`] = "City contains invalid characters";
  }

  if (!traveller.country?.trim()) {
    errors[`t${index}_country`] = "Country is required";
  }

  if (traveller?.zipCode?.trim()) {
    const zip = traveller.zipCode.trim();
    if (!/^[A-Za-z0-9\s-]+$/.test(zip)) {
      errors[`t${index}_zipCode`] = "Zip code contains invalid characters";
    } else if (!/\d/.test(zip)) {
      errors[`t${index}_zipCode`] = "Zip code must contain at least one number";
    }
  }

  return errors;
};

export const validateDocuments = (
  traveller: TravellerData,
  index: number
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!traveller.passportPhoto) {
    errors[`t${index}_passportPhoto`] = "Passport bio page is required";
  }

  if (!traveller.personalPhoto) {
    errors[`t${index}_personalPhoto`] = "Personal photo is required";
  }

  return errors;
};

export const validateDeclaration = (
  traveller: TravellerData,
  index: number
): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  if (!traveller.declarationAccepted) {
    errors[`t${index}_declarationAccepted`] = "You must accept the declaration";
  }

  if (!traveller.termsAccepted) {
    errors[`t${index}_termsAccepted`] =
      "You must accept the terms and conditions";
  }

  if (!traveller.googlePoliciesAccepted) {
    errors[`t${index}_googlePoliciesAccepted`] =
      "You must accept the google policies and terms";
  }

  return errors;
};
