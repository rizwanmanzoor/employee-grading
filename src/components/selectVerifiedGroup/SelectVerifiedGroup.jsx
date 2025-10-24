import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SelectVerifiedGroup = () => {
  const [verifiedSelected, setVerifiedSelected] = useState("");

  const optionsVerified = [
    { id: "verified", label: "Verified" },
    { id: "unverified", label: "Unverified" },
  ];

  const handleVerifiedSelect = (id) => {
    setVerifiedSelected(id);
  };
  return (
    <div className="border rounded-2xl shadow-sm inline-flex flex-wrap gap-6 py-2 px-4">
      {optionsVerified.map((option) => (
        <div key={option.id} className="flex items-center gap-3">
          <Checkbox
            id={option.id}
            checked={verifiedSelected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleVerifiedSelect(option.id);
            }}
          />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default SelectVerifiedGroup;
