import { useEffect, useState } from "react";
import { GovButton } from "./ui/button-variants";
import { VisaTypeDropdown } from "./VisaTypeDropDown";
import { Calendar, CalendarCheck, Clock3, Plane } from "lucide-react";

export const LandingHero = () => {
  const VISA_TYPES = [
    "Single entry - 90 Days validity - $75",
    "Multiple entry - 180 Days validity $115",
  ];

  const [selectedVisa, setSelectedVisa] = useState("");

  // Error state
  const [errors, setErrors] = useState({ visa: "" });

  useEffect(() => {
    localStorage.removeItem("visaType");
  }, []);

  const handleApplyNow = () => {
    const newErrors = { visa: "" };
    let valid = true;

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

  const getValidityLabel = (visaType: string) => {
    if (!visaType) return "Shown after selecting a visa type";
    return visaType;
  };

  const getEntryTypeLabel = (visaType: string) => {
    const normalizedVisaType = visaType.toLowerCase();

    if (normalizedVisaType.includes("single")) return "Single";
    if (normalizedVisaType.includes("multiple")) return "Multiple";

    return "Shown after selecting a visa type";
  };

  const infoCards = [
    {
      title: "Processing timeframe",
      value: "4 to 7 Days",
      icon: Clock3,
    },
    {
      title: "Valid for",
      value: getValidityLabel(selectedVisa),
      icon: Calendar,
    },
    {
      title: "Maximum stay",
      value: "30 Days per entry",
      icon: CalendarCheck,
    },
    {
      title: "Number of entries",
      value: getEntryTypeLabel(selectedVisa),
      icon: Plane,
    },
  ];

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
          <div className="grid grid-cols-1 gap-4 max-w-xs sm:max-w-xs mx-auto">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-8">
            {infoCards.map(({ title, value, icon: Icon }) => (
              <div
                key={title}
                className="group h-full rounded-2xl border border-white/70 bg-white/90 p-5 text-left shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-22px_rgba(37,99,235,0.35)]"
              >
                <div className="flex h-full items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/10">
                    <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {title}
                    </p>
                    <p className="text-lg font-semibold leading-snug text-slate-900 break-words">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
