import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";

interface NationalityDropdownProps {
  value: string;
  onChange: (val: string) => void;
  nationalities: { code: string; name: string }[];
  getFlagUrl: (code: string) => string;
  triggerClassName?: string;
}

const NationalityDropdown = ({
  value,
  onChange,
  nationalities,
  getFlagUrl,
  triggerClassName = "",
}: NationalityDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const filtered = nationalities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const selectedCountry = nationalities.find((c) => c.code === value);

  // --- Click outside handler ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${triggerClassName}`} ref={ref}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full text-left border-2 rounded-lg bg-white hover:bg-gray-50 transition-colors flex justify-between items-center h-12 px-3 ${
          isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
        }`}
      >
        {" "}
        <div className="flex items-center space-x-3">
          {selectedCountry ? (
            <>
              {" "}
              <img
                src={getFlagUrl(selectedCountry.code)}
                className="w-6 h-4 object-cover"
              />{" "}
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span className="text-gray-900 text-sm">Select nationality</span>
          )}{" "}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-[300] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-0"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No countries found
              </div>
            ) : (
              filtered.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left p-3 hover:bg-blue-50 transition-colors flex items-center space-x-3 ${
                    value === country.code
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-900"
                  }`}
                >
                  <img
                    src={getFlagUrl(country.code)}
                    className="w-6 h-4 object-cover"
                  />
                  <span className="flex-1">{country.name}</span>
                  {value === country.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalityDropdown;
