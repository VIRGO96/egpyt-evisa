export interface FormData {
  // Step 1 - Visa Selection
  visaType: string;

  // Travellers data
  travellers: TravellerData[];

  // Step 7 - Payment
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;

  // Application tracking
  applicationId?: string;
}

export interface TravellerData {
  applicationId: string;
  // Travel Information
  countryOfDeparture?: string;
  expectedArrivalDate?: string;
  expectedDepartureDate?: string;

  // Personal Information
  nationality: string;
  fullName: string;
  maritalStatus?: string;
  otherNames: boolean | string;
  otherNamesValue?: string;
  hasJob: boolean | string;
  jobTitle?: string;
  employerName?: string;
  passportNumber: string;
  dateOfBirth: string;
  otherNationalities: boolean | string;
  otherNationalitiesValue?: string[];
  passportExpiry?: string;
  address?: string;
  visitedUkBefore?: boolean | string;
  lastUkEntryDate?: string;
  lastUkExitDate?: string;
  lastUkStayAddress?: string;
  willBeHostedInUk?: boolean | string;
  hostName?: string;
  hostType?: string;
  hostPhoneNumber?: string;
  hostFullAddress?: string;
  travelExpensePayer?: string;
  travelExpensePayerDetails?: string;

  // Age-based fields
  parentName?: string;
  hasCriminalConviction?: boolean;
  crimeDetails?: string;
  convictionCountry?: string;
  sentencedOver12Months?: boolean;
  hasWarCrimesHistory?: boolean;
  warCrimesTypes?: string[];

  // Contact Details
  email?: string;
  emailConfirm?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  zipCode?: string;

  // Documents
  passportPhoto?: any;
  personalPhoto?: any;
  parentPassportPhoto?: any;


  // Declaration
  declarationAccepted?: boolean;
  termsAccepted?: boolean;
  googlePoliciesAccepted? : boolean;
  nonRefundableAccepted?: boolean;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack?: () => void;
  isSaving?: boolean;
  setCurrentStep?: (step: number) => void;
}
