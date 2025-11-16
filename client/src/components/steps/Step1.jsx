import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import UploadFile from "../uploadFile/UploadFile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { useTranslation } from "react-i18next";

const Step1 = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const savedEducation = useSelector((state) => state.stepper.stepData.step1?.education);
  const [education, setEducation] = useState(savedEducation || "Basics");

  const handleChange = (value) => {
    setEducation(value);
    dispatch(saveStepData({ step: "step1", data: { education: value } }));
  };

  useEffect(() => {
    dispatch(saveStepData({ step: "step1", data: { education: "Basics" } }));
  }, []);

  const educationOptions = ["Basics", "Diploma", "Bachelors", "Masters", "Phd"];

  return (
    <>
      {/* Header */}
      <div className={`flex items-center gap-3 pb-4 border-b ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}>
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <BookOpen />
        </div>
        <div className={`${i18n.language === "ar" ? "text-right" : "text-left"}`}>
          <h3 className="text-xl font-bold">{t("select_education_level")}</h3>
          <p className="text-sm text-gray-600">{t("choose_highest_education")}</p>
        </div>
      </div>

      {/* Education Options */}
      <div className="my-5">
        <RadioGroup
          value={education}
          onValueChange={handleChange}
          className="grid grid-cols-1 gap-4 md:max-w-xl "
        >
          {educationOptions.map((opt) => (
            <div key={opt} className="input-field">
              <Label className={i18n.language === "ar" ? "flex-row-reverse" : ""}>
                <RadioGroupItem value={opt} /> {t(opt)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Upload & Other Components */}
      <UploadFile step="step1" />

      <div className="max-w-xl flex flex-col gap-4 mt-5 justify-start">
        <SelectVerifiedGroup step="step1" />
        <SelectRelevantGroup step="step1" />
      </div>
    </>
  );
};

export default Step1;
