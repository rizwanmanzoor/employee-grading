import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import UploadFile from "../uploadFile/UploadFile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";
import { saveStepData } from "@/features/stepper/stepperSlice";

const Step1 = () => {
  const dispatch = useDispatch();

  const savedEducation = useSelector((state) => state.stepper.stepData.step1?.education);

  const [education, setEducation] = useState(savedEducation || "Basics");

  const handleChange = (value) => {
    setEducation(value);
    dispatch(saveStepData({ step: "step1", data: { education: value } }));
  };

  // ✅ Save default value on first render
  useEffect(() => {
    dispatch(saveStepData({ step: "step1", data: { education: "Basics" } }));
  }, []);


  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <BookOpen />
        </div>
        <div>
          <h3 className="text-xl font-bold">Select Your Education Level</h3>
          <p className="text-sm text-gray-600">
            Choose your highest level of education
          </p>
        </div>
      </div>

      <div className="my-5">
        <RadioGroup
          value={education}
          onValueChange={handleChange}
          className="grid grid-cols-1 gap-4 md:max-w-xl"
        >
           {["Basics", "Diploma", "Bachelors", "Masters", "Phd"].map((opt) => (
            <div key={opt} className="input-field">
              <Label>
                <RadioGroupItem value={opt} /> {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <UploadFile step="step1" />

      <div className="max-w-xl flex flex-col gap-4 mt-5">
        <SelectVerifiedGroup step="step1" />
        <SelectRelevantGroup step="step1" />
      </div>
    </>
  );
};

export default Step1;
