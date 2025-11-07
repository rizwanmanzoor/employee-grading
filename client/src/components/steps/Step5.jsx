import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Step5 = () => {

  const proficiencyLevels = [
    { label: "None", value: "none" },
    { label: "Basic", value: "basic" },
    { label: "Average", value: "average" },
    { label: "Good", value: "good" },
    { label: "Excellent", value: "excellent" },
  ];
  const dispatch = useDispatch();

    // Get saved data from Redux store
    const savedProficiency = useSelector((state) => state.stepper.stepData.step5);

    // Initialize local state (default: "none")
    const [proficiency, setProficiency] = useState(
      savedProficiency && savedProficiency.value ? savedProficiency.value : "none"
    );

    // Handle selection change
    const handleProficiencyChange = (value) => {
      setProficiency(value);
      dispatch(saveStepData({ step: "step5", data: { value } }));
    };

    // Sync local state with Redux (for back navigation)
    useEffect(() => {
      if (savedProficiency && savedProficiency.value) {
        setProficiency(savedProficiency.value);
      }
    }, [savedProficiency]);

    // Save default data only once (on first mount)
    useEffect(() => {
      if (!savedProficiency || !savedProficiency.value) {
        dispatch(saveStepData({ step: "step5", data: { value: proficiency } }));
      }
    }, []);
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Globe />
        </div>
        <div>
          <h3 className="text-xl font-bold">English Proficiency</h3>
          <p className="text-sm text-gray-600">
            Select your English language proficiency level
          </p>
        </div>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup
          value={proficiency}
          onValueChange={handleProficiencyChange}
          className="grid grid-cols-1 gap-4 md:max-w-xl"
        >
          {proficiencyLevels.map((item) => (
            <div key={item.value} className="input-field">
              <Label htmlFor={`option-${item.value}`} className="flex items-center gap-2">
                <RadioGroupItem
                  value={item.value}
                  id={`option-${item.value}`}
                />
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default Step5;
