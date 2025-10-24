import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SelectRelevantGroup = () => {
  const [relevantSelected, setRelevantSelected] = useState("");

  const optionsRelevant = [
    { id: "relevant", label: "Relevant" },
    { id: "irrelevant", label: "Irrelevant" },
  ];

  const handleRelevantSelect = (id) => {
    setRelevantSelected(id);
  };

  return (
    <div className="border rounded-2xl shadow-sm inline-flex flex-wrap gap-6 py-2 px-4">
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

export default SelectRelevantGroup;
