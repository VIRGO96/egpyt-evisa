import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TravellerData } from "@/types/form";
import { COUNTRIES } from "@/utils/countries";
import { MONTHS, calculateAge } from "@/utils/ageRelatedFunctions";
import { useEffect, useState } from "react";

interface AgeSpecificQuestionsSectionProps {
  traveller: TravellerData;
  index: number;
  updateTraveller: (
    index: number,
    field: keyof TravellerData,
    value: any
  ) => void;
  errors: { [key: string]: string };
}

const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString().padStart(2, "0"),
  label: (i + 1).toString(),
}));

const YEARS = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

// Helper functions for date validation
const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () =>
  (new Date().getMonth() + 1).toString().padStart(2, "0");
const getCurrentDay = () => new Date().getDate().toString().padStart(2, "0");

// Filter months based on selected year
const getFilteredMonths = (year: string) => {
  const currentYear = getCurrentYear().toString();
  const currentMonth = getCurrentMonth();

  if (year === currentYear) {
    return MONTHS.filter((month) => month.value <= currentMonth);
  }

  return MONTHS;
};

// Filter days based on selected month and year
const getFilteredDays = (month: string, year: string) => {
  const currentYear = getCurrentYear().toString();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();

  if (year === currentYear && month === currentMonth) {
    return DAYS.filter((day) => day.value <= currentDay);
  }

  return DAYS;
};

export const AgeSpecificQuestionsSection = ({
  traveller,
  index,
  updateTraveller,
  errors,
}: AgeSpecificQuestionsSectionProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const age = calculateAge(traveller.dateOfBirth);

  // Get filtered options based on current selections
  const filteredMonths = getFilteredMonths(selectedYear);
  const filteredDays = getFilteredDays(selectedMonth, selectedYear);

  // Parse current date of birth into month, day, year
  useEffect(() => {
    if (traveller.dateOfBirth) {
      const [year, month, day] = traveller.dateOfBirth.split("-");
      setSelectedMonth(month || "");
      setSelectedDay(day || "");
      setSelectedYear(year || "");
    } else {
      setSelectedMonth("");
      setSelectedDay("");
      setSelectedYear("");
    }
  }, [traveller.dateOfBirth]);

  // Update date of birth when any part changes
  const handleDatePartChange = (
    part: "month" | "day" | "year",
    value: string
  ) => {
    if (part === "month") setSelectedMonth(value);
    if (part === "day") setSelectedDay(value);
    if (part === "year") setSelectedYear(value);

    // Only update if all parts are selected
    const newMonth = part === "month" ? value : selectedMonth;
    const newDay = part === "day" ? value : selectedDay;
    const newYear = part === "year" ? value : selectedYear;

    if (newMonth && newDay && newYear) {
      const newDate = `${newYear}-${newMonth}-${newDay}`;

      // Validate the date
      const date = new Date(newDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time part for accurate comparison

      if (!isNaN(date.getTime()) && date <= today) {
        updateTraveller(index, "dateOfBirth", newDate);
      } else {
        // If invalid date (future), clear it
        updateTraveller(index, "dateOfBirth", "");
      }
    } else {
      // If not all parts are selected, clear the date
      updateTraveller(index, "dateOfBirth", "");
    }
  };

  // Get display value for dropdown
  const getDisplayValue = (part: "month" | "day" | "year") => {
    if (part === "month") {
      const month = MONTHS.find((m) => m.value === selectedMonth);
      return month ? month.label : "";
    }
    if (part === "day") {
      return selectedDay || "";
    }
    if (part === "year") {
      return selectedYear || "";
    }
    return "";
  };

  return (
    <div className="space-y-6 mt-6">
      <div data-error={`t${index}_dateOfBirth`}>
        <Label className="text-base font-semibold mb-3 block">
          Date of birth *
        </Label>

        <div className="grid grid-cols-3 gap-3">
          {/* Month Dropdown */}
          <div>
            <Select
              value={selectedYear}
              onValueChange={(value) => handleDatePartChange("year", value)}
            >
              <SelectTrigger
                className={`rounded-lg border-2 ${
                  errors[`t${index}_dateOfBirth`]
                    ? "border-destructive"
                    : "border-input"
                }`}
              >
                <SelectValue placeholder="Year">
                  {getDisplayValue("year")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {YEARS.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Day Dropdown */}
          <div>
            <Select
              value={selectedMonth}
              onValueChange={(value) => handleDatePartChange("month", value)}
            >
              <SelectTrigger
                className={`rounded-lg border-2 ${
                  errors[`t${index}_dateOfBirth`]
                    ? "border-destructive"
                    : "border-input"
                }`}
              >
                <SelectValue placeholder="Month">
                  {getDisplayValue("month")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {filteredMonths.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Dropdown */}
          <div>
            <Select
              value={selectedDay}
              onValueChange={(value) => handleDatePartChange("day", value)}
            >
              <SelectTrigger
                className={`rounded-lg border-2 ${
                  errors[`t${index}_dateOfBirth`]
                    ? "border-destructive"
                    : "border-input"
                }`}
              >
                <SelectValue placeholder="Day">
                  {getDisplayValue("day")}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {filteredDays.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {errors[`t${index}_dateOfBirth`] && (
          <p className="text-sm text-destructive mt-2">
            {errors[`t${index}_dateOfBirth`]}
          </p>
        )}
      </div>

      {/* For children under 12 */}
      {traveller?.dateOfBirth && age < 12 && (
        <div data-error={`t${index}_parentName`}>
          <Label
            htmlFor={`parentName-${index}`}
            className="text-base font-semibold mb-2 block"
          >
            Full name of one parent *
          </Label>
          <Input
            id={`parentName-${index}`}
            value={traveller.parentName || ""}
            onChange={(e) => {
              const value = e.target.value
                .replace(/[^a-zA-Z\s]/g, "")
                .replace(/\s+/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

              updateTraveller(index, "parentName", value);
            }}
            onBlur={(e) => {
              const value = e.target.value.trim().replace(/\s+/g, " ");
              updateTraveller(index, "parentName", value);
            }}
            className={`rounded-lg border-2 ${
              errors[`t${index}_parentName`]
                ? "border-destructive"
                : "border-input"
            }`}
            placeholder="Parent's full name"
            minLength={3}
          />
          {errors[`t${index}_parentName`] && (
            <p className="text-sm text-destructive mt-1">
              {errors[`t${index}_parentName`]}
            </p>
          )}
        </div>
      )}

      {traveller?.dateOfBirth && age >= 16 && (
        <>
          <div className="bg-muted/30 p-5 rounded-lg border-2 border-input" data-error={`t${index}_hasCriminalConviction`}>
            <Label className="text-base font-semibold mb-3 block">
              A. Have you ever had a criminal conviction? *
            </Label>
            <div className="flex space-x-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={traveller.hasCriminalConviction === true}
                  onChange={() =>
                    updateTraveller(index, "hasCriminalConviction", true)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={traveller.hasCriminalConviction === false}
                  onChange={() =>
                    updateTraveller(index, "hasCriminalConviction", false)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
            {errors[`t${index}_hasCriminalConviction`] && (
              <p className="text-sm text-destructive mb-3">
                {errors[`t${index}_hasCriminalConviction`]}
              </p>
            )}

            {traveller.hasCriminalConviction === true && (
              <div className="space-y-4 mt-4 pt-4 border-t">
                <div data-error={`t${index}_crimeDetails`}>
                  <Label
                    htmlFor={`crimeDetails-${index}`}
                    className="text-sm font-medium mb-2 block"
                  >
                    What crime were you convicted of? *
                  </Label>
                  <Input
                    id={`crimeDetails-${index}`}
                    value={traveller.crimeDetails || ""}
                    onChange={(e) =>
                      updateTraveller(index, "crimeDetails", e.target.value)
                    }
                    className={`rounded-lg ${
                      errors[`t${index}_crimeDetails`]
                        ? "border-destructive"
                        : ""
                    }`}
                    placeholder="Describe the crime"
                  />
                  {errors[`t${index}_crimeDetails`] && (
                    <p className="text-sm text-destructive mt-1">
                      {errors[`t${index}_crimeDetails`]}
                    </p>
                  )}
                </div>

                <div data-error={`t${index}_convictionCountry`}>
                  <Label
                    htmlFor={`convictionCountry-${index}`}
                    className="text-sm font-medium mb-2 block"
                  >
                    Which country were you convicted in? *
                  </Label>
                  <Select
                    value={traveller.convictionCountry || ""}
                    onValueChange={(value) =>
                      updateTraveller(index, "convictionCountry", value)
                    }
                  >
                    <SelectTrigger
                      id={`convictionCountry-${index}`}
                      className={`rounded-lg ${
                        errors[`t${index}_convictionCountry`]
                          ? "border-destructive"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors[`t${index}_convictionCountry`] && (
                    <p className="text-sm text-destructive mt-1">
                      {errors[`t${index}_convictionCountry`]}
                    </p>
                  )}
                </div>

                <div data-error={`t${index}_sentencedOver12Months`}>
                  <Label className="text-sm font-medium mb-3 block">
                    Were you sentenced to more than 12 months in prison? *
                  </Label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={traveller.sentencedOver12Months === true}
                        onChange={() =>
                          updateTraveller(index, "sentencedOver12Months", true)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={traveller.sentencedOver12Months === false}
                        onChange={() =>
                          updateTraveller(index, "sentencedOver12Months", false)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                  {errors[`t${index}_sentencedOver12Months`] && (
                    <p className="text-sm text-destructive mt-1">
                      {errors[`t${index}_sentencedOver12Months`]}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="bg-muted/30 p-5 rounded-lg border-2 border-input" data-error={`t${index}_hasWarCrimesHistory`}>
            <Label className="text-base font-semibold mb-3 block">
              B. Have you ever supported, or been suspected or convicted of, war
              crimes, terrorism or extremism? *
            </Label>
            <div className="flex space-x-6 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={traveller.hasWarCrimesHistory === true}
                  onChange={() =>
                    updateTraveller(index, "hasWarCrimesHistory", true)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={traveller.hasWarCrimesHistory === false}
                  onChange={() =>
                    updateTraveller(index, "hasWarCrimesHistory", false)
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
            {errors[`t${index}_hasWarCrimesHistory`] && (
              <p className="text-sm text-destructive mb-3">
                {errors[`t${index}_hasWarCrimesHistory`]}
              </p>
            )}

            {traveller.hasWarCrimesHistory === true && (
              <div className="space-y-3 mt-4 pt-4 border-t" data-error={`t${index}_warCrimesTypes`}>
                <p className="text-sm font-medium mb-2">
                  Select all that apply:
                </p>
                {[
                  {
                    value: "war_crimes",
                    label:
                      "War crimes: This includes genocide or crimes against humanity",
                  },
                  {
                    value: "terrorism",
                    label:
                      "Terrorism: This includes support for, or membership of, terrorist groups",
                  },
                  {
                    value: "extremism",
                    label:
                      "Extremism: This includes support for extremist groups or expressing extremist views",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(traveller.warCrimesTypes || []).includes(
                        option.value
                      )}
                      onChange={(e) => {
                        const current = traveller.warCrimesTypes || [];
                        const updated = e.target.checked
                          ? [...current, option.value]
                          : current.filter((v) => v !== option.value);
                        updateTraveller(index, "warCrimesTypes", updated);
                      }}
                      className="w-4 h-4 mt-0.5"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
                {errors[`t${index}_warCrimesTypes`] && (
                  <p className="text-sm text-destructive mt-2">
                    {errors[`t${index}_warCrimesTypes`]}
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
