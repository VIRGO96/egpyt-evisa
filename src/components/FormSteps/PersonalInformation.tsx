import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TravellerData } from "@/types/form";
import { nationalities, allNationalities } from "@/utils/nationalities";
import { Search, ChevronDown, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface PersonalInformationSectionProps {
  traveller: TravellerData;
  index: number;
  updateTraveller: (
    index: number,
    field: keyof TravellerData,
    value: any,
  ) => void;
  errors: { [key: string]: string };
}

interface selectedCountry {
  code: string;
  name: string;
}

export const PersonalInformationSection = ({
  traveller,
  index,
  updateTraveller,
  errors,
}: PersonalInformationSectionProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [nationalitySearch, setNationalitySearch] = useState(""); // Local state for search
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<selectedCountry | null>(null);
  const hasDetected = useRef(false);
  const totalCount = useRef(false);

  const filteredCountries = nationalities.filter((nationality) =>
    nationality.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!traveller.nationality) return;

    const selected = nationalities.find(
      (country) => country.code === traveller.nationality,
    );
    setSelectedCountry(selected);
  }, [traveller?.nationality]);

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
    updateTraveller(index, "nationality", countryCode);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchTerm("");
    }
  };

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };

  return (
    <div className="space-y-6">
      <div data-error={`t${index}_nationality`} ref={dropdownRef}>
        <Label
          htmlFor={`nationality-${index}`}
          className="text-base font-semibold mb-2 block"
        >
          Nationality *
        </Label>

        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className={`w-full text-left p-3 border-2 rounded-lg bg-white hover:bg-gray-50 transition-colors ${
              errors[`t${index}_nationality`]
                ? "border-destructive"
                : "border-input"
            } ${isDropdownOpen ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedCountry ? (
                  <>
                    <img
                      src={getFlagUrl(selectedCountry.code)}
                      alt={`${selectedCountry.name} flag`}
                      className="w-6 h-4 object-cover"
                    />
                    <span className="text-gray-900">
                      {selectedCountry.name}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500">Select your nationality</span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-0"
                    autoFocus
                  />
                </div>
              </div>

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
                        traveller.nationality === country.code
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-900"
                      }`}
                    >
                      <img
                        src={getFlagUrl(country.code)}
                        alt={`${country.name} flag`}
                        className="w-6 h-4 object-cover flex-shrink-0"
                      />
                      <span className="flex-1">{country.name}</span>
                      {traveller.nationality === country.code && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))
                )}
              </div>

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

        {errors[`t${index}_nationality`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_nationality`]}
          </p>
        )}
      </div>
      <div className="space-y-3" data-error={`t${index}_otherNationalities`}>
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50/50 transition-all hover:border-gray-300">
          <div
            className={`flex items-center space-x-3 ${
              traveller.otherNationalities ? "mb-4" : "mb-0"
            }`}
          >
            <Label className="text-base font-semibold text-gray-900">
              Do you have other nationalities?
            </Label>

            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  traveller.otherNationalities
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                Yes
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={traveller.otherNationalities === true}
                onClick={() =>
                  updateTraveller(
                    index,
                    "otherNationalities",
                    !traveller.otherNationalities,
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  traveller.otherNationalities ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    traveller.otherNationalities
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  traveller.otherNationalities === false
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                No
              </span>
            </div>
          </div>

          {traveller.otherNationalities && (
            <div className="pt-4 border-t border-gray-200 space-y-4">
              <Label className="text-sm font-semibold">
                Select additional nationalities:
              </Label>

              <input
                type="text"
                placeholder="Search countries..."
                className="w-full px-3 py-2 border-2 border-input rounded-lg bg-white text-sm focus:outline-none"
                onChange={(e) => setNationalitySearch(e.target.value)}
                value={nationalitySearch}
              />

              <div className="max-h-48 overflow-y-auto border-2 border-input rounded-lg p-3 bg-white">
                <div className="grid gap-2">
                  {allNationalities
                    .filter((c) => c.code !== traveller.nationality)
                    .filter((c) =>
                      nationalitySearch
                        ? c.name
                            .toLowerCase()
                            .includes(nationalitySearch.toLowerCase())
                        : true,
                    )
                    .map((country) => {
                      const isSelected =
                        traveller.otherNationalitiesValue?.includes(
                          country.code,
                        );

                      return (
                        <label
                          key={country.code}
                          className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                            isSelected
                              ? "bg-primary/10 border border-primary/20"
                              : "hover:bg-muted/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              const current =
                                traveller.otherNationalitiesValue || [];
                              updateTraveller(
                                index,
                                "otherNationalitiesValue",
                                e.target.checked
                                  ? [...current, country.code]
                                  : current.filter((c) => c !== country.code),
                              );
                            }}
                            className="w-3 h-3 rounded text-primary focus:ring-0"
                          />
                          <img
                            src={getFlagUrl(country.code)}
                            className="w-5 h-3.5 object-cover"
                          />
                          <span className="text-sm">{country.name}</span>
                        </label>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          {(traveller.otherNationalitiesValue || []).length > 0 && (
            <div className="mt-2 p-2 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground mb-1">
                Selected nationalities:
              </p>
              <div className="flex flex-wrap gap-1">
                {(traveller.otherNationalitiesValue || []).map((code) => {
                  const country = allNationalities.find((c) => c.code === code);
                  return (
                    <span
                      key={code}
                      className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {country?.name}
                      <button
                        type="button"
                        onClick={() => {
                          const newValues = (
                            traveller.otherNationalitiesValue || []
                          ).filter((c) => c !== code);
                          updateTraveller(
                            index,
                            "otherNationalitiesValue",
                            newValues,
                          );
                        }}
                        className="ml-1 text-primary/70 hover:text-primary"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {errors[`t${index}_otherNationalities`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_otherNationalities`]}
          </p>
        )}
      </div>

      <div data-error={`t${index}_fullName`}>
        <Label
          htmlFor={`fullName-${index}`}
          className="text-base font-semibold mb-2 block"
        >
          Full name (as in passport) *
        </Label>
        <Input
          id={`fullName-${index}`}
          value={traveller.fullName || ""}
          onChange={(e) => {
            const value = e.target.value
              .replace(/[^a-zA-Z\s]/g, "")
              .replace(/\s+/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

            updateTraveller(index, "fullName", value);

            if (errors[`t${index}_fullName`]) {
              const newErrors = { ...errors };
              delete newErrors[`t${index}_fullName`];
            }
          }}
          className={`rounded-lg border-2 ${
            errors[`t${index}_fullName`] ? "border-destructive" : "border-input"
          }`}
          placeholder="John Doe"
        />
        {errors[`t${index}_fullName`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_fullName`]}
          </p>
        )}
      </div>
      <div className="space-y-3" data-error={`t${index}_otherNames`}>
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50/50 transition-all hover:border-gray-300">
          {/* Question + Toggle */}
          <div
            className={`flex items-center space-x-3 ${
              traveller.otherNames ? "mb-4" : "mb-0"
            }`}
          >
            <Label className="text-base font-semibold text-gray-900">
              Have you used other names?
            </Label>

            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  traveller.otherNames ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Yes
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={traveller.otherNames === true}
                onClick={() =>
                  updateTraveller(index, "otherNames", !traveller.otherNames)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  traveller.otherNames ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    traveller.otherNames ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  traveller.otherNames === false
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                No
              </span>
            </div>
          </div>

          {/* Conditional field */}
          {traveller.otherNames && (
            <div className="pt-4 border-t border-gray-200">
              <Input
                id={`otherNamesValue-${index}`}
                value={traveller.otherNamesValue || ""}
                onChange={(e) =>
                  updateTraveller(index, "otherNamesValue", e.target.value)
                }
                className={`rounded-lg border-2 bg-white ${
                  errors[`t${index}_otherNamesValue`]
                    ? "border-destructive"
                    : "border-input"
                }`}
                placeholder="Enter other names"
              />
            </div>
          )}
        </div>

        {errors[`t${index}_otherNames`] && (
          <p className="text-destructive text-sm mt-1">
            {errors[`t${index}_otherNames`]}
          </p>
        )}
      </div>

      <div className="space-y-3" data-error={`t${index}_hasJob`}>
        {/* Question + Toggle + Conditional Fields - All Grouped */}
        <div className="border-2 border-primary rounded-lg p-5 bg-primary/10 transition-all hover:border-primary hover:shadow-lg shadow-md">
          <div
            className={`flex items-center space-x-3 ${
              traveller?.hasJob ? "mb-4" : "mb-0"
            }`}
          >
            <Label className="text-base font-bold text-gray-900 flex items-center gap-2">
              Do you have a job?
              <span className="text-primary text-xl font-bold">*</span>
            </Label>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-semibold transition-colors ${
                  traveller.hasJob === true ? "text-primary" : "text-gray-500"
                }`}
              >
                Yes
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={traveller.hasJob === true}
                onClick={() =>
                  updateTraveller(index, "hasJob", !traveller.hasJob)
                }
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none shadow-sm ${
                  traveller.hasJob === true ? "bg-primary" : "bg-gray-400"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    traveller.hasJob === true
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-semibold transition-colors ${
                  traveller.hasJob === false ? "text-primary" : "text-gray-500"
                }`}
              >
                No
              </span>
            </div>
          </div>
          {/* Conditional Job Details - Grouped Inside Same Container */}
          {traveller.hasJob && (
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Job Title */}
              <div data-error={`t${index}_jobTitle`}>
                <Label
                  htmlFor={`jobTitle-${index}`}
                  className="text-sm font-medium mb-2 block"
                >
                  Job title *
                </Label>
                <Input
                  id={`jobTitle-${index}`}
                  value={traveller.jobTitle || ""}
                  onChange={(e) =>
                    updateTraveller(index, "jobTitle", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_jobTitle`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  placeholder="Software Engineer"
                />
                {errors[`t${index}_jobTitle`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_jobTitle`]}
                  </p>
                )}
              </div>

              {/* Employer Name */}
              <div data-error={`t${index}_employerName`}>
                <Label
                  htmlFor={`employerName-${index}`}
                  className="text-sm font-medium mb-2 block"
                >
                  Employer name *
                </Label>
                <Input
                  id={`employerName-${index}`}
                  value={traveller.employerName || ""}
                  onChange={(e) =>
                    updateTraveller(index, "employerName", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_employerName`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  placeholder="Company Name"
                />
                {errors[`t${index}_employerName`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_employerName`]}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {errors[`t${index}_hasJob`] && (
          <p className="text-destructive text-sm mt-1">
            {errors[`t${index}_hasJob`]}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div data-error={`t${index}_passportNumber`}>
          <div className="flex justify-between items-center mb-2">
            <Label
              htmlFor={`passportNumber-${index}`}
              className="text-base font-semibold"
            >
              Passport number *
            </Label>
          </div>
          <Input
            id={`passportNumber-${index}`}
            maxLength={15}
            value={traveller.passportNumber || ""}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              updateTraveller(index, "passportNumber", value);

              if (errors[`t${index}_passportNumber`]) {
                const newErrors = { ...errors };
                delete newErrors[`t${index}_passportNumber`];
              }
            }}
            className={`rounded-lg border-2 ${
              errors[`t${index}_passportNumber`]
                ? "border-destructive"
                : "border-input"
            }`}
            placeholder="AB1234567"
          />
          {errors[`t${index}_passportNumber`] && (
            <p className="text-sm text-destructive mt-1">
              {errors[`t${index}_passportNumber`]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
