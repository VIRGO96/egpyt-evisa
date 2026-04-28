import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TravellerData } from "@/types/form";
import { COUNTRIES } from "@/utils/countries";
import { Search, ChevronDown, MapPin, Mail, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { nationalities } from "@/utils/nationalities";
import ApplicationService from "@/services/applicationService";

interface ContactDetailsSectionProps {
  traveller: TravellerData;
  index: number;
  updateTraveller: (
    index: number,
    field: keyof TravellerData,
    value: any,
  ) => void;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onVerificationChange?: (index: number, isVerified: boolean) => void;
}

export const ContactDetailsSection = ({
  traveller,
  index,
  updateTraveller,
  errors,
  setErrors,
  onVerificationChange,
}: ContactDetailsSectionProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Email verification states
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get selected country
  const selectedCountry = COUNTRIES.find(
    (country) => country.code === traveller.country,
  );

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const detectCountry = useCallback(async () => {
    try {
      const fallbackResponse = await fetch("https://api.country.is/");
      const fallbackData = await fallbackResponse.json();

      if (fallbackData?.country) {
        const countryCode = fallbackData.country;
        const detectedCountry = COUNTRIES.find(
          (country) => country.code === countryCode,
        );

        if (detectedCountry) {
          setDetectedCountry(detectedCountry.name);
          if (!traveller.country) {
            updateTraveller(index, "country", countryCode);
          }

          if (!traveller.nationality) {
            const exists = nationalities.some(
              (n) =>
                n.name.toLowerCase() === detectedCountry.name.toLowerCase(),
            );

            if (exists) {
              updateTraveller(index, "nationality", countryCode);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error detecting country:", error);
    } finally {
      setIsDetecting(false);
    }
  }, [index, traveller.country, traveller.nationality, updateTraveller]);

  useEffect(() => {
    if (!traveller.country || !traveller.nationality) {
      detectCountry();
    }
  }, [detectCountry, traveller.country, traveller.nationality]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCountry = (countryCode: string) => {
    updateTraveller(index, "country", countryCode);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchTerm("");
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    updateTraveller(index, "phoneNumber", value);

    const valid = isValidPhoneNumber(value);
    if (!valid) {
      setErrors((prev) => ({
        ...prev,
        [`t${index}_phoneNumber`]: "Invalid phone number for selected country",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`t${index}_phoneNumber`];
        return newErrors;
      });
    }
  };

  const handleSendVerificationCode = async () => {
    // Validate email first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!traveller.email || !emailRegex.test(traveller.email)) {
      setErrors((prev) => ({
        ...prev,
        [`t${index}_email`]: "Please enter a valid email address",
      }));
      return;
    }

    setIsSendingCode(true);
    try {
      // Call actual API to send verification code
      await ApplicationService.sendEmailVerification(traveller.email);

      setIsCodeSent(true);
      setCountdown(60); // 60 seconds countdown

      // Clear any previous email errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`t${index}_email`];
        return newErrors;
      });
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        [`t${index}_email`]:
          error.message ||
          "Failed to send verification code. Please try again.",
      }));
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    // Validate code format
    if (verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
      setErrors((prev) => ({
        ...prev,
        [`t${index}_verificationCode`]: "Please enter a valid 6-digit code",
      }));
      return;
    }

    setIsVerifying(true);
    try {
      // Call actual API to verify code
      await ApplicationService.verifyEmailCode(
        traveller.email,
        verificationCode,
      );

      setIsVerified(true);

      // Notify parent component about verification status
      if (onVerificationChange) {
        onVerificationChange(index, true);
      }

      // Clear verification code error
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`t${index}_verificationCode`];
        return newErrors;
      });
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        [`t${index}_verificationCode`]:
          error.message || "Invalid verification code. Please try again.",
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Verification Required Alert */}
      {errors[`t${index}_emailVerification`] && (
        <div className="bg-destructive/10 border-2 border-destructive rounded-lg p-4">
          <p className="text-destructive font-semibold">
            {errors[`t${index}_emailVerification`]}
          </p>
        </div>
      )}

      {/* Email with Verification */}
      <div data-error={`t${index}_email`}>
        <Label
          htmlFor={`email-${index}`}
          className="text-base font-semibold mb-2 block"
        >
          Email address *
        </Label>
        <div className="flex gap-2">
          <Input
            id={`email-${index}`}
            type="email"
            value={traveller.email || ""}
            onChange={(e) => {
              updateTraveller(index, "email", e.target.value);
              // Reset verification if email changes
              if (isCodeSent || isVerified) {
                setIsCodeSent(false);
                setIsVerified(false);
                setVerificationCode("");
                if (onVerificationChange) {
                  onVerificationChange(index, false);
                }
              }
            }}
            className={`rounded-lg border-2 ${
              errors[`t${index}_email`] ? "border-destructive" : "border-input"
            }`}
            placeholder="your.email@example.com"
            disabled={isVerified}
          />
          <Button
            type="button"
            onClick={handleSendVerificationCode}
            disabled={
              isSendingCode || countdown > 0 || isVerified || !traveller.email
            }
            className="whitespace-nowrap"
            variant={isVerified ? "outline" : "default"}
          >
            {isVerified ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified
              </>
            ) : isSendingCode ? (
              "Sending..."
            ) : countdown > 0 ? (
              `Resend (${countdown}s)`
            ) : isCodeSent ? (
              "Resend Code"
            ) : (
              <>
                <Mail className="w-4 h-4 mr-1" />
                Get Code
              </>
            )}
          </Button>
        </div>
        {errors[`t${index}_email`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_email`]}
          </p>
        )}
        {isCodeSent && !isVerified && (
          <p className="text-sm text-green-600 mt-1">
            Verification code has been sent to your email, check your inbox or
            spam folder.
          </p>
        )}
        {!isVerified && (
          <p className="text-sm text-amber-600 mt-1 font-medium">
            You must verify your email to continue
          </p>
        )}
      </div>

      {/* Verification Code Field */}
      {isCodeSent && !isVerified && (
        <div
          data-error={`t${index}_verificationCode`}
          className="animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <Label
            htmlFor={`verificationCode-${index}`}
            className="text-base font-semibold mb-2 block"
          >
            Verification Code *
          </Label>
          <div className="flex gap-2">
            <Input
              id={`verificationCode-${index}`}
              type="text"
              value={verificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setVerificationCode(value);
                // Clear error when user types
                if (errors[`t${index}_verificationCode`]) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`t${index}_verificationCode`];
                    return newErrors;
                  });
                }
              }}
              className={`rounded-lg border-2 font-mono text-lg tracking-widest ${
                errors[`t${index}_verificationCode`]
                  ? "border-destructive"
                  : "border-input"
              }`}
              placeholder=""
              maxLength={6}
            />
            <Button
              type="button"
              onClick={handleVerifyCode}
              disabled={isVerifying || verificationCode.length !== 6}
              className="whitespace-nowrap"
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
          {errors[`t${index}_verificationCode`] && (
            <p className="text-sm text-destructive mt-1">
              {errors[`t${index}_verificationCode`]}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>
      )}

      <div data-error={`t${index}_phoneNumber`}>
        <Label
          htmlFor={`phoneNumber-${index}`}
          className="text-base font-semibold mb-2 block"
        >
          Phone number *
        </Label>

        {/* Detection Status */}
        {isDetecting && (
          <div className="mb-2 flex items-center text-sm text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            Detecting your country...
          </div>
        )}

        <PhoneInput
          country={selectedCountry?.code.toLocaleLowerCase() || "us"}
          value={traveller.phoneNumber || ""}
          onChange={(value) => {
            const fullValue = "+" + value;
            handlePhoneChange(index, fullValue);
          }}
          inputProps={{
            id: `phoneNumber-${index}`,
            required: true,
          }}
          enableSearch={true}
          inputStyle={{
            width: "100%",
            borderRadius: "0.5rem",
            borderWidth: "2px",
            borderColor: errors[`t${index}_phoneNumber`]
              ? "#ef4444"
              : "#d1d5db", // Tailwind red-500 / gray-300
            height: "42px",
            fontSize: "16px",
          }}
        />

        {errors[`t${index}_phoneNumber`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_phoneNumber`]}
          </p>
        )}
      </div>

      <div data-error={`t${index}_address`}>
        <Label
          htmlFor={`address-${index}`}
          className="text-base font-semibold mb-2 block"
        >
          Current address *
        </Label>
        <Input
          id={`address-${index}`}
          value={traveller.address || ""}
          onChange={(e) => updateTraveller(index, "address", e.target.value)}
          className={`rounded-lg border-2 ${
            errors[`t${index}_address`] ? "border-destructive" : "border-input"
          }`}
          placeholder="123 Main Street, Apartment 4B"
        />
        {errors[`t${index}_address`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_address`]}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div data-error={`t${index}_city`}>
          <Label
            htmlFor={`city-${index}`}
            className="text-base font-semibold mb-2 block"
          >
            City *
          </Label>
          <Input
            id={`city-${index}`}
            value={traveller.city || ""}
            onChange={(e) => updateTraveller(index, "city", e.target.value)}
            className={`rounded-lg border-2 ${
              errors[`t${index}_city`] ? "border-destructive" : "border-input"
            }`}
            placeholder="City"
          />
          {errors[`t${index}_city`] && (
            <p className="text-sm text-destructive mt-1">
              {errors[`t${index}_city`]}
            </p>
          )}
        </div>
      </div>

      {/* Country (after City) */}
      <div data-error={`t${index}_country`} ref={dropdownRef}>
        <Label
          htmlFor={`country-${index}`}
          className="text-base font-semibold mb-2 block"
        >
          Country *
        </Label>

        {/* Detection Status */}
        {isDetecting && (
          <div className="mb-2 flex items-center text-sm text-blue-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
            Detecting your country...
          </div>
        )}

        {/* Custom Dropdown */}
        <div className="relative">
          {/* Dropdown Trigger */}
          <button
            type="button"
            onClick={toggleDropdown}
            className={`w-full text-left p-3 border-2 rounded-lg bg-white hover:bg-gray-50 transition-colors ${
              errors[`t${index}_country`]
                ? "border-destructive"
                : "border-input"
            } ${isDropdownOpen ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedCountry ? (
                  <span className="text-gray-900">{selectedCountry.name}</span>
                ) : (
                  <span className="text-gray-500">Select country</span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
              {/* Search Box */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>
              </div>

              {/* Countries List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No countries found
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleSelectCountry(country.code)}
                      className={`w-full text-left p-3 hover:bg-blue-50 transition-colors flex items-center space-x-3 ${
                        traveller.country === country.code
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-900"
                      }`}
                    >
                      <span className="flex-1">{country.name}</span>
                      {traveller.country === country.code && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Auto-detection Info */}
              {detectedCountry && !searchTerm && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Auto-detected: {detectedCountry}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {errors[`t${index}_country`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_country`]}
          </p>
        )}
      </div>
    </div>
  );
};
