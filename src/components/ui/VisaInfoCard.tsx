import { Calendar, CalendarCheck, Clock3, Plane } from "lucide-react";

type Props = {
  visaType?: string;
};

const getVisaMeta = (visaType?: string) => {
  const normalized = (visaType || "").toLowerCase();
  const isSingle = normalized.includes("single");
  const isMultiple = normalized.includes("multiple");

  return {
    validFor:
      visaType ||
      "Shown after selecting an application type",
    numberOfEntries: isSingle ? "Single" : isMultiple ? "Multiple" : "—",
  };
};

export const VisaInfoCard = ({ visaType }: Props) => {
  const meta = getVisaMeta(visaType);
  return (
    <div className="relative bg-card p-5 rounded-xl shadow-lg border-2 border-gray-200">
      <h2 className="text-2xl font-bold mt-0">Egypt eVisa</h2>
      <hr className="my-3" />
      <div className="space-y-5">
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Valid for</p>
            <p className="font-bold">{meta.validFor}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Clock3 className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Processing timeframe</p>
            <p className="font-bold">4 to 7 Days</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <CalendarCheck className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Maximum stay</p>
            <p className="font-bold">30 Days per entry</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Plane className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Number of entries</p>
            <p className="font-bold">{meta.numberOfEntries}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
