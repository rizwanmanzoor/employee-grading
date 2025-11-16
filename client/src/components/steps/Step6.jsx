import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "react-i18next";


const Step6 = () => {

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const internalExperienceOptions = [
    { label: t("step6.options.none"), value: "none" },
    { label: t("step6.options.1"), value: "1" },
    { label: t("step6.options.2"), value: "2" },
    { label: t("step6.options.3"), value: "3" },
    { label: t("step6.options.4"), value: "4" },
    { label: t("step6.options.5"), value: "5" },
    { label: t("step6.options.6"), value: "6" },
    { label: t("step6.options.7"), value: "7" },
    { label: t("step6.options.8"), value: "8" }
  ];

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
      <div className={`flex items-center gap-3 pb-4 border-b ${
          isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}>
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Layers />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {t("step6.title")}
          </h3>
          <p className="text-sm text-gray-600">
            {t("step6.subtitle")}
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className={`text-sm text-primary ${isRTL ? "text-right" : "text-left"}`}>
          <span className="font-bold">{t("step6.note_title")}</span>
          {t("step6.note")}
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
              <Label htmlFor={`option-${option.value}`} className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
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
