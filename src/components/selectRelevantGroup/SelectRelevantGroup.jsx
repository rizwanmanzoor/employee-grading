import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SelectRelevantGroup = () => {
  const [relevantSelected, setRelevantSelected] = useState("");

  const optionsRelevant = [
    { id: "relevant", label: "Relevant", weight: "100%" },
    { id: "irrelevant", label: "Irrelevant", weight: "20%" },
  ];

  const handleRelevantSelect = (id) => {
    setRelevantSelected(id);
  };

  return (
    <div className="border-2 rounded-xl inline-flex flex-wrap gap-10 py-4 px-8">
      {optionsRelevant.map((option) => (
        <div key={option.id} className="flex items-center gap-3">
          <Checkbox
            id={option.id}
            checked={relevantSelected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleRelevantSelect(option.id);
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

export default SelectRelevantGroup;
