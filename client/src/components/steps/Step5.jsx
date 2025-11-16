import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "react-i18next";

const Step5 = () => {

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const proficiencyLevels = [
    { label: t("english_proficiency_step.none"), value: "none" },
    { label: t("english_proficiency_step.basic"), value: "basic" },
    { label: t("english_proficiency_step.average"), value: "average" },
    { label: t("english_proficiency_step.good"), value: "good" },
    { label: t("english_proficiency_step.excellent"), value: "excellent" }
  ];

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
      <div className={`flex items-center gap-3 pb-4 border-b ${
          isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}>
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Globe />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t("english_proficiency_step.title")}</h3>
          <p className="text-sm text-gray-600">
            {t("english_proficiency_step.desc")}
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
              <Label htmlFor={`option-${item.value}`} className={`flex items-center gap-2 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}>
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
