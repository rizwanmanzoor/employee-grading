import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";

// 🔹 Options for Internal Management Experience
const internalManagementExperienceOptions = [
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

const Step7 = () => {

  const dispatch = useDispatch();

  // 🔹 Get saved data from Redux
  const savedData = useSelector((state) => state.stepper.stepData.step7);

  // 🔹 Local state initialization
  const [managementExperience, setManagementExperience] = useState(
    savedData && savedData.experience ? savedData.experience : "none"
  );

  // ✅ Handle Experience Change
  const handleExperienceChange = (value) => {
    setManagementExperience(value);
    dispatch(saveStepData({ step: "step7", data: { experience: value } }));
  };

  // 🔹 Sync local state with Redux (for back navigation)
  useEffect(() => {
    if (savedData && savedData.experience) {
      setManagementExperience(savedData.experience);
    }
  }, [savedData]);

  // 🔹 Save default state on mount if not already stored
  useEffect(() => {
    if (!savedData || !savedData.experience) {
      dispatch(
        saveStepData({
          step: "step7",
          data: { experience: managementExperience },
        })
      );
    }
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Users />
        </div>
        <div>
          <h3 className="text-xl font-bold">Internal Management Experience</h3>
          <p className="text-sm text-gray-600">
            Select your years of internal management experience
          </p>
        </div>
      </div>

      <div className="mt-5 max-w-3xl bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-primary">
          <span className="font-bold">Note:</span> Internal management
          experience is weighted at 25% of your total score.
        </p>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup
          value={managementExperience}
          onValueChange={handleExperienceChange}
          className="grid grid-cols-1 gap-4 md:max-w-xl"
        >
          {internalManagementExperienceOptions.map((option) => (
            <div key={option.value} className="input-field">
              <Label
                htmlFor={`option-${option.value}`}
                className="flex items-center gap-2"
              >
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

      <div className="max-w-xl flex flex-col gap-4">
        <SelectVerifiedGroup step="step7" />
      </div>
    </>
  );
};

export default Step7;
