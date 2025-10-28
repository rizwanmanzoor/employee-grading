import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SelectVerifiedGroup = () => {
  const [verifiedSelected, setVerifiedSelected] = useState("");

  const optionsVerified = [
    { id: "verified", label: "Verified", weight: "100%" },
    { id: "unverified", label: "Unverified", weight: "25%" },
  ];

  const handleVerifiedSelect = (id) => {
    setVerifiedSelected(id);
  };
  return (
    <div className="border-2 rounded-xl inline-flex flex-wrap gap-10 py-4 px-8">
      {optionsVerified.map((option) => (
        <div key={option.id} className="flex items-center gap-3">
          <Checkbox
            id={option.id}
            checked={verifiedSelected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleVerifiedSelect(option.id);
            }}
          />
          <Label htmlFor={option.id}>
            <span>{option.label}</span>
            <small className="ml-[-7px]">({option.weight})</small>
          </Label>
        </div>
      ))}
    </div>
  );
};

export default SelectVerifiedGroup;
