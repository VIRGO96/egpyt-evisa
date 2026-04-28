import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TravellerData } from "@/types/form";
import { nationalities, allNationalities } from "@/utils/nationalities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/utils/countries";
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

const MARITAL_STATUS_OPTIONS = [
  "Married",
  "Single",
  "Divorced",
  "Widow",
  "Not applicable (Child/Baby)",
];

const HOST_TYPE_OPTIONS = [
  "Family",
  "Friend",
  "Tourism company",
  "Commercial entity",
];

const TRAVEL_EXPENSE_OPTIONS = [
  "By myself",
  "My parents",
  "My work",
  "Commercial entity in Egypt",
  "Other",
];

export const PersonalInformationSection = ({
  traveller,
  index,
  updateTraveller,
  errors,
}: PersonalInformationSectionProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDepartureDropdownOpen, setIsDepartureDropdownOpen] = useState(false);
  const [departureSearchTerm, setDepartureSearchTerm] = useState("");
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [nationalitySearch, setNationalitySearch] = useState(""); // Local state for search
  const dropdownRef = useRef<HTMLDivElement>(null);
  const departureDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<selectedCountry | null>(null);
  const [selectedDepartureCountry, setSelectedDepartureCountry] =
    useState<selectedCountry | null>(null);
  const hasDetected = useRef(false);
  const totalCount = useRef(false);

  const filteredCountries = nationalities.filter((nationality) =>
    nationality.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const departureCountries = COUNTRIES.filter(
    (country) => country.code !== "EG" && country.name !== "Egypt",
  );
  const filteredDepartureCountries = departureCountries.filter((country) =>
    country.name.toLowerCase().includes(departureSearchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!traveller.nationality) return;

    const selected = nationalities.find(
      (country) => country.code === traveller.nationality,
    );
    setSelectedCountry(selected);
  }, [traveller?.nationality]);

  useEffect(() => {
    if (!traveller.countryOfDeparture) {
      setSelectedDepartureCountry(null);
      return;
    }

    const selected = departureCountries.find(
      (country) => country.code === traveller.countryOfDeparture,
    );
    setSelectedDepartureCountry(selected || null);
  }, [traveller.countryOfDeparture]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }

      if (
        departureDropdownRef.current &&
        !departureDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDepartureDropdownOpen(false);
        setDepartureSearchTerm("");
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

  const handleSelectDepartureCountry = (countryCode: string) => {
    updateTraveller(index, "countryOfDeparture", countryCode);
    setIsDepartureDropdownOpen(false);
    setDepartureSearchTerm("");
  };

  const toggleDepartureDropdown = () => {
    setIsDepartureDropdownOpen(!isDepartureDropdownOpen);
    if (!isDepartureDropdownOpen) {
      setDepartureSearchTerm("");
    }
  };

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };

  const minimumArrivalDate = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split("T")[0];
  })();

  const payerNeedsDetails =
    traveller.travelExpensePayer === "Commercial entity in Egypt" ||
    traveller.travelExpensePayer === "Other";

  return (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-gray-200 bg-gray-50/50 p-4">
        <h4 className="mb-4 text-base font-semibold text-gray-900">
          Travel information
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div
            data-error={`t${index}_countryOfDeparture`}
            ref={departureDropdownRef}
          >
            <Label className="text-sm font-medium mb-2 block">
              Country of departure *
            </Label>

            <div className="relative">
              <button
                type="button"
                onClick={toggleDepartureDropdown}
                className={`w-full text-left p-3 border-2 rounded-lg bg-white hover:bg-gray-50 transition-colors ${
                  errors[`t${index}_countryOfDeparture`]
                    ? "border-destructive"
                    : "border-input"
                } ${
                  isDepartureDropdownOpen
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedDepartureCountry ? (
                      <>
                        <img
                          src={getFlagUrl(selectedDepartureCountry.code)}
                          alt={`${selectedDepartureCountry.name} flag`}
                          className="w-6 h-4 object-cover"
                        />
                        <span className="text-gray-900">
                          {selectedDepartureCountry.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">
                        Select country of departure
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isDepartureDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {isDepartureDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={departureSearchTerm}
                        onChange={(e) => setDepartureSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-0"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {filteredDepartureCountries.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No countries found
                      </div>
                    ) : (
                      filteredDepartureCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() =>
                            handleSelectDepartureCountry(country.code)
                          }
                          className={`w-full text-left p-3 hover:bg-blue-50 transition-colors flex items-center space-x-3 ${
                            traveller.countryOfDeparture === country.code
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
                          {traveller.countryOfDeparture === country.code && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            {errors[`t${index}_countryOfDeparture`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_countryOfDeparture`]}
              </p>
            )}
          </div>

          <div data-error={`t${index}_expectedArrivalDate`}>
            <Label
              htmlFor={`expectedArrivalDate-${index}`}
              className="text-sm font-medium mb-2 block"
            >
              Expected arrival date *
            </Label>
            <Input
              id={`expectedArrivalDate-${index}`}
              type="date"
              min={minimumArrivalDate}
              value={traveller.expectedArrivalDate || ""}
              onChange={(e) =>
                updateTraveller(index, "expectedArrivalDate", e.target.value)
              }
              className={`rounded-lg border-2 ${
                errors[`t${index}_expectedArrivalDate`]
                  ? "border-destructive"
                  : "border-input"
              }`}
            />
            {errors[`t${index}_expectedArrivalDate`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_expectedArrivalDate`]}
              </p>
            )}
          </div>

          <div data-error={`t${index}_expectedDepartureDate`}>
            <Label
              htmlFor={`expectedDepartureDate-${index}`}
              className="text-sm font-medium mb-2 block"
            >
              Expected departure date *
            </Label>
            <Input
              id={`expectedDepartureDate-${index}`}
              type="date"
              min={traveller.expectedArrivalDate || minimumArrivalDate}
              value={traveller.expectedDepartureDate || ""}
              onChange={(e) =>
                updateTraveller(index, "expectedDepartureDate", e.target.value)
              }
              className={`rounded-lg border-2 ${
                errors[`t${index}_expectedDepartureDate`]
                  ? "border-destructive"
                  : "border-input"
              }`}
            />
            {errors[`t${index}_expectedDepartureDate`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_expectedDepartureDate`]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-gray-200 bg-gray-50/50 p-4">
        <h4 className="mb-4 text-base font-semibold text-gray-900">
          Personal information
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div data-error={`t${index}_fullName`}>
            <Label
              htmlFor={`fullName-${index}`}
              className="text-sm font-medium mb-2 block"
            >
              Full name in English (as in the passport) *
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
              }}
              className={`rounded-lg border-2 ${
                errors[`t${index}_fullName`]
                  ? "border-destructive"
                  : "border-input"
              }`}
              placeholder="John Doe"
            />
            {errors[`t${index}_fullName`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_fullName`]}
              </p>
            )}
          </div>

          <div data-error={`t${index}_dateOfBirth`}>
            <Label
              htmlFor={`dateOfBirth-${index}`}
              className="text-sm font-medium mb-2 block"
            >
              Date of Birth *
            </Label>
            <Input
              id={`dateOfBirth-${index}`}
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={traveller.dateOfBirth || ""}
              onChange={(e) =>
                updateTraveller(index, "dateOfBirth", e.target.value)
              }
              className={`rounded-lg border-2 ${
                errors[`t${index}_dateOfBirth`]
                  ? "border-destructive"
                  : "border-input"
              }`}
            />
            {errors[`t${index}_dateOfBirth`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_dateOfBirth`]}
              </p>
            )}
          </div>

          <div data-error={`t${index}_jobTitle`}>
            <Label
              htmlFor={`jobTitle-${index}`}
              className="text-sm font-medium mb-2 block"
            >
              Profession *
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
              placeholder="Profession"
            />
            {errors[`t${index}_jobTitle`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_jobTitle`]}
              </p>
            )}
          </div>

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
              placeholder="Employer name"
            />
            {errors[`t${index}_employerName`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_employerName`]}
              </p>
            )}
          </div>

          <div data-error={`t${index}_maritalStatus`}>
            <Label className="text-sm font-medium mb-2 block">
              Marital status *
            </Label>
            <Select
              value={traveller.maritalStatus || ""}
              onValueChange={(value) =>
                updateTraveller(index, "maritalStatus", value)
              }
            >
              <SelectTrigger
                className={`rounded-lg border-2 ${
                  errors[`t${index}_maritalStatus`]
                    ? "border-destructive"
                    : "border-input"
                }`}
              >
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {MARITAL_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[`t${index}_maritalStatus`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_maritalStatus`]}
              </p>
            )}
          </div>
        </div>
      </div>

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

      <div className="space-y-3" data-error={`t${index}_visitedUkBefore`}>
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50/50 transition-all hover:border-gray-300">
          <div
            className={`flex items-center space-x-3 ${
              traveller.visitedUkBefore ? "mb-4" : "mb-0"
            }`}
          >
            <Label className="text-base font-semibold text-gray-900">
              Did you visit Egypt in the past? *
            </Label>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  traveller.visitedUkBefore ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Yes
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={traveller.visitedUkBefore === true}
                onClick={() =>
                  updateTraveller(
                    index,
                    "visitedUkBefore",
                    !traveller.visitedUkBefore,
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  traveller.visitedUkBefore ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    traveller.visitedUkBefore ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  traveller.visitedUkBefore === false
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                No
              </span>
            </div>
          </div>

          {traveller.visitedUkBefore && (
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div data-error={`t${index}_lastUkEntryDate`}>
                <Label
                  htmlFor={`lastUkEntryDate-${index}`}
                  className="text-sm font-medium mb-2 block"
                >
                  Date of entry for your last visit *
                </Label>
                <Input
                  id={`lastUkEntryDate-${index}`}
                  type="date"
                  value={traveller.lastUkEntryDate || ""}
                  onChange={(e) =>
                    updateTraveller(index, "lastUkEntryDate", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_lastUkEntryDate`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                />
                {errors[`t${index}_lastUkEntryDate`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_lastUkEntryDate`]}
                  </p>
                )}
              </div>

              <div data-error={`t${index}_lastUkExitDate`}>
                <Label
                  htmlFor={`lastUkExitDate-${index}`}
                  className="text-sm font-medium mb-2 block"
                >
                  Exit date for your last visit
                </Label>
                <Input
                  id={`lastUkExitDate-${index}`}
                  type="date"
                  min={traveller.lastUkEntryDate || undefined}
                  value={traveller.lastUkExitDate || ""}
                  onChange={(e) =>
                    updateTraveller(index, "lastUkExitDate", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_lastUkExitDate`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                />
                {errors[`t${index}_lastUkExitDate`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_lastUkExitDate`]}
                  </p>
                )}
              </div>

              <div
                className="md:col-span-2"
                data-error={`t${index}_lastUkStayAddress`}
              >
                <Label
                  htmlFor={`lastUkStayAddress-${index}`}
                  className="text-sm font-medium mb-2 block"
                >
                  Where did you stay during your last visit? *
                </Label>
                <Input
                  id={`lastUkStayAddress-${index}`}
                  value={traveller.lastUkStayAddress || ""}
                  onChange={(e) =>
                    updateTraveller(index, "lastUkStayAddress", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_lastUkStayAddress`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  placeholder="Hotel, host address, or stay location"
                />
                {errors[`t${index}_lastUkStayAddress`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_lastUkStayAddress`]}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {errors[`t${index}_visitedUkBefore`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_visitedUkBefore`]}
          </p>
        )}
      </div>

      <div className="space-y-3" data-error={`t${index}_willBeHostedInUk`}>
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50/50 transition-all hover:border-gray-300">
          <div
            className={`flex items-center space-x-3 ${
              traveller.willBeHostedInUk ? "mb-4" : "mb-0"
            }`}
          >
            <Label className="text-base font-semibold text-gray-900">
              Will you be hosted by a family, friend or tourism company in Egypt? *
            </Label>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${
                  traveller.willBeHostedInUk ? "text-gray-900" : "text-gray-400"
                }`}
              >
                Yes
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={traveller.willBeHostedInUk === true}
                onClick={() =>
                  updateTraveller(
                    index,
                    "willBeHostedInUk",
                    !traveller.willBeHostedInUk,
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  traveller.willBeHostedInUk ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    traveller.willBeHostedInUk
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  traveller.willBeHostedInUk === false
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                No
              </span>
            </div>
          </div>

          {traveller.willBeHostedInUk && (
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div data-error={`t${index}_hostName`}>
                <Label className="text-sm font-medium mb-2 block">
                  Host name *
                </Label>
                <Input
                  value={traveller.hostName || ""}
                  onChange={(e) =>
                    updateTraveller(index, "hostName", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_hostName`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  placeholder="Host name"
                />
                {errors[`t${index}_hostName`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_hostName`]}
                  </p>
                )}
              </div>

              <div data-error={`t${index}_hostType`}>
                <Label className="text-sm font-medium mb-2 block">
                  Select host type *
                </Label>
                <Select
                  value={traveller.hostType || ""}
                  onValueChange={(value) =>
                    updateTraveller(index, "hostType", value)
                  }
                >
                  <SelectTrigger
                    className={`rounded-lg border-2 ${
                      errors[`t${index}_hostType`]
                        ? "border-destructive"
                        : "border-input"
                    }`}
                  >
                    <SelectValue placeholder="Select host type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    {HOST_TYPE_OPTIONS.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors[`t${index}_hostType`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_hostType`]}
                  </p>
                )}
              </div>

              <div data-error={`t${index}_hostPhoneNumber`}>
                <Label className="text-sm font-medium mb-2 block">
                  Host phone number *
                </Label>
                <Input
                  value={traveller.hostPhoneNumber || ""}
                  onChange={(e) =>
                    updateTraveller(index, "hostPhoneNumber", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_hostPhoneNumber`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  placeholder="+44 20 1234 5678"
                />
                {errors[`t${index}_hostPhoneNumber`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_hostPhoneNumber`]}
                  </p>
                )}
              </div>

              <div
                className="md:col-span-2"
                data-error={`t${index}_hostFullAddress`}
              >
                <Label className="text-sm font-medium mb-2 block">
                  Host full address *
                </Label>
                <Input
                  value={traveller.hostFullAddress || ""}
                  onChange={(e) =>
                    updateTraveller(index, "hostFullAddress", e.target.value)
                  }
                  className={`rounded-lg border-2 bg-white ${
                    errors[`t${index}_hostFullAddress`]
                      ? "border-destructive"
                      : "border-input"
                  }`}
                  placeholder="Full host address"
                />
                {errors[`t${index}_hostFullAddress`] && (
                  <p className="text-sm text-destructive mt-1">
                    {errors[`t${index}_hostFullAddress`]}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {errors[`t${index}_willBeHostedInUk`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_willBeHostedInUk`]}
          </p>
        )}
      </div>

      <div data-error={`t${index}_travelExpensePayer`}>
        <Label className="text-base font-semibold mb-2 block">
          Who is paying for your travel expenses? *
        </Label>
        <Select
          value={traveller.travelExpensePayer || ""}
          onValueChange={(value) =>
            updateTraveller(index, "travelExpensePayer", value)
          }
        >
          <SelectTrigger
            className={`rounded-lg border-2 ${
              errors[`t${index}_travelExpensePayer`]
                ? "border-destructive"
                : "border-input"
            }`}
          >
            <SelectValue placeholder="Select who is paying" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            {TRAVEL_EXPENSE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors[`t${index}_travelExpensePayer`] && (
          <p className="text-sm text-destructive mt-1">
            {errors[`t${index}_travelExpensePayer`]}
          </p>
        )}

        {payerNeedsDetails && (
          <div
            className="mt-4"
            data-error={`t${index}_travelExpensePayerDetails`}
          >
            <Label className="text-sm font-medium mb-2 block">
              Please provide details about who is paying for the cost of your
              travel *
            </Label>
            <Input
              value={traveller.travelExpensePayerDetails || ""}
              onChange={(e) =>
                updateTraveller(index, "travelExpensePayerDetails", e.target.value)
              }
              className={`rounded-lg border-2 ${
                errors[`t${index}_travelExpensePayerDetails`]
                  ? "border-destructive"
                  : "border-input"
              }`}
              placeholder="Enter payer details"
            />
            {errors[`t${index}_travelExpensePayerDetails`] && (
              <p className="text-sm text-destructive mt-1">
                {errors[`t${index}_travelExpensePayerDetails`]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
