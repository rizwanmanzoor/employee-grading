import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SelectOptionGroup = () => {
  const [verifiedSelected, setVerifiedSelected] = useState("");
  const [relevantSelected, setRelevantSelected] = useState("");

  const optionsVerified = [
    { id: "verified", label: "Verified" },
    { id: "unverified", label: "Unverified" },
  ];

  const optionsRelevant = [
    { id: "relevant", label: "Relevant" },
    { id: "irrelevant", label: "Irrelevant" },
  ];

  const handleVerifiedSelect = (id) => {
    setVerifiedSelected(id);
  };

  const handleRelevantSelect = (id) => {
    setRelevantSelected(id);
  };

  return (
    <div className="flex flex-wrap gap-6">
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

      {optionsRelevant.map((option) => (
        <div key={option.id} className="flex items-center gap-3">
          <Checkbox
            id={option.id}
            checked={relevantSelected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleRelevantSelect(option.id);
            }}
          />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default SelectOptionGroup;
