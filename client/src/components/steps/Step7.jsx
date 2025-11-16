import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import { useTranslation } from "react-i18next";


const Step7 = () => {

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const internalManagementExperienceOptions = [
    { label: t("step7.options.none"), value: "none" },
    { label: t("step7.options.1"), value: "1" },
    { label: t("step7.options.2"), value: "2" },
    { label: t("step7.options.3"), value: "3" },
    { label: t("step7.options.4"), value: "4" },
    { label: t("step7.options.5"), value: "5" },
    { label: t("step7.options.6"), value: "6" },
    { label: t("step7.options.7"), value: "7" },
    { label: t("step7.options.8"), value: "8" }
  ];

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
      <div className={`flex items-center gap-3 pb-4 border-b ${
          isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}>
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Users />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t("step7.title")}</h3>
          <p className="text-sm text-gray-600">
          {t("step7.subtitle")}
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className={`text-sm text-primary ${isRTL ? "text-right" : "text-left"}`}>
          <span className="font-bold">{t("step7.note_title")}: </span> {t("step7.note")}
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
                className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
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
