import {
  Banknote,
  Calendar,
  CalendarCheck,
  Coins,
  Flame,
  Plane,
  Receipt,
  Wallet,
} from "lucide-react";

export const VisaInfoCard = () => {
  return (
    <div className="relative bg-card p-5 rounded-xl shadow-lg border-2 border-gray-200">
      <h2 className="text-2xl font-bold mt-0">United Kingdom ETA</h2>
      <hr className="my-3" />
      <div className="space-y-5">
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Valid for</p>
            <p className="font-bold">2 years, multiple entries</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <Plane className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Processing time</p>
            <p className="font-bold">Within 72 hours</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 p-3 rounded-lg">
            <CalendarCheck className="w-6 h-6 text-gray-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Max stay</p>
            <p className="font-bold">180 days per entry</p>
          </div>
        </div>
      </div>
    </div>
  );
};
