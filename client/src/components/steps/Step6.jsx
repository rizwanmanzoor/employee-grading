import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const internalExperienceOptions = [
  { label: "None", value: "none" },
  { label: "1 year", value: "1year" },
  { label: "2 years", value: "2year" },
  { label: "3 years", value: "3year" },
  { label: "4 years", value: "4year" },
  { label: "5 years", value: "5year" },
  { label: "6 years", value: "6year" },
  { label: "7 years", value: "7year" },
  { label: "8 years", value: "8year" },
];

const Step6 = () => {

  const dispatch = useDispatch();

  // Get saved data from Redux
  const savedExperience = useSelector((state) => state.stepper.stepData.step6);

  // Initialize local state (default to "none")
  const [experience, setExperience] = useState(
    savedExperience && savedExperience.value ? savedExperience.value : "none"
  );

  // ✅ Handle change
  const handleExperienceChange = (value) => {
    setExperience(value);
    dispatch(saveStepData({ step: "step6", data: { value } }));
  };

  // Sync local state if Redux updates (back navigation)
  useEffect(() => {
    if (savedExperience && savedExperience.value) {
      setExperience(savedExperience.value);
    }
  }, [savedExperience]);

  // Save default once (first mount)
  useEffect(() => {
    if (!savedExperience || !savedExperience.value) {
      dispatch(saveStepData({ step: "step6", data: { value: experience } }));
    }
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Layers />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            Internal Experience (Excluding Management)
          </h3>
          <p className="text-sm text-gray-600">
            Select your years of internal non-management experience
          </p>
        </div>
      </div>

      <div className="mt-5 max-w-3xl bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-primary">
          <span className="font-bold">Note:</span> Internal experience
          contributes to external experience calculations at 0.5 years per year
          of service.
        </p>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup
          value={experience}
          onValueChange={handleExperienceChange}
          className="grid grid-cols-1 gap-4 md:max-w-xl"
        >
          {internalExperienceOptions.map((option) => (
            <div key={option.value} className="input-field">
              <Label htmlFor={`option-${option.value}`} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option.value}
                  id={`option-${option.value}`}
                />
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default Step6;
