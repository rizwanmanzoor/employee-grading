import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SelectOptionGroup = () => {
  const [selected, setSelected] = useState("verified");

  const options = [
    { id: "verified", label: "Verified" },
    { id: "unverified", label: "Unverified" },
    { id: "relevant", label: "Relevant" },
    { id: "irrelevant", label: "Irrelevant" },
  ];

  const handleSelect = (id) => {
    setSelected(id);
  };
  return (
    <div className="flex flex-wrap gap-6">
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-3">
          <Checkbox
            id={option.id}
            checked={selected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleSelect(option.id);
            }}
          />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default SelectOptionGroup;
