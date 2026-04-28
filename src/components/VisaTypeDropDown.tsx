import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export function VisaTypeDropdown({ value, onChange, visaTypes, triggerClassName }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`rounded-lg border-2 border-input ${triggerClassName}`}
      >
        <SelectValue placeholder="Select type" />
      </SelectTrigger>

      <SelectContent className="rounded-lg">
        {visaTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
