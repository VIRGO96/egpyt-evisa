import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GovButton } from "./ui/button-variants";
import { nationalities } from "@/utils/nationalities";
import NationalityDropdown from "./NationalityDropDown";
import { VisaTypeDropdown } from "./VisaTypeDropDown";
import { COUNTRIES } from "@/utils/countries";

export const LandingHero = () => {
  const VISA_TYPES = ["United Kingdom ETA - 2 years, Multiple entry"];

  const [selectedNationality, setSelectedNationality] = useState("");
  const [selectedVisa, setSelectedVisa] = useState("");

  // Error state
  const [errors, setErrors] = useState({ nationality: "", visa: "" });

  const getFlagUrl = (countryCode: string) =>
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

  const detectCountry = async () => {
    try {
      const fallbackResponse = await fetch("https://api.country.is/");
      const fallbackData = await fallbackResponse.json();

      if (fallbackData?.country) {
        const countryCode = fallbackData.country;
        const detectedCountry = COUNTRIES.find(
          (country) => country.code === countryCode,
        );

        if (detectedCountry) {
          const exists = nationalities.some(
            (n) => n.name.toLowerCase() === detectedCountry.name.toLowerCase(),
          );

          if (exists) {
            setSelectedNationality(detectedCountry.code);
            localStorage.setItem("nationality", detectedCountry.code);
          }
        }
      }
    } catch (error) {
      console.error("Error detecting country:", error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("visaType");
    localStorage.removeItem("nationality");

    detectCountry();

    // Pre-fill visa if only one option
    if (VISA_TYPES.length === 1) {
      setSelectedVisa(VISA_TYPES[0]);
      localStorage.setItem("visaType", VISA_TYPES[0]);
    }
  }, []);

  const handleApplyNow = () => {
    const newErrors = { nationality: "", visa: "" };
    let valid = true;

    if (!selectedNationality) {
      newErrors.nationality = "Please select your nationality.";
      valid = false;
    }

    if (!selectedVisa) {
      newErrors.visa = "Please select your application type.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Both fields are filled, proceed to apply
      window.location.href = "/apply";
    }
  };

  return (
    <section className="relative bg-primary/20 py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary">
            Electronic Travel Authorization ETA
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Submit your UK Visa ETA application to obtain a
            digital approval before you travel.
          </p>

          {/* Selection Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xs sm:max-w-lg mx-auto">
            <div className="flex justify-center w-full">
              <div className="flex flex-col items-start w-full">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  My passport
                </label>
                <NationalityDropdown
                  value={selectedNationality}
                  onChange={(val) => {
                    setSelectedNationality(val);
                    localStorage.setItem("nationality", val);
                    setErrors({ ...errors, nationality: "" });
                  }}
                  nationalities={nationalities}
                  getFlagUrl={getFlagUrl}
                  triggerClassName="w-full h-12"
                />
                {errors.nationality && (
                  <p className="pl-1 text-sm text-destructive mt-1">
                    {errors.nationality}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center w-full">
              <div className="flex flex-col items-start w-full">
                <label className="mb-2 text-sm font-semibold text-gray-700">
                  Application type
                </label>
                <VisaTypeDropdown
                  value={selectedVisa}
                  onChange={(val) => {
                    setSelectedVisa(val);
                    localStorage.setItem("visaType", val);
                    setErrors({ ...errors, visa: "" });
                  }}
                  visaTypes={VISA_TYPES}
                  triggerClassName="w-full h-12 bg-white"
                />
                {errors.visa && (
                  <p className="pl-1 text-sm text-destructive mt-1">
                    {errors.visa}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-4 justify-center items-center pt-3">
            <GovButton
              size="lg"
              className="bg-blue-900 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold"
              onClick={handleApplyNow}
            >
              Apply for ETA
            </GovButton>
          </div>
        </div>
      </div>
    </section>
  );
};
