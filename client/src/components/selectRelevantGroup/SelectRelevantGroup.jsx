import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { useTranslation } from "react-i18next"; // ✅ import translation

const SelectRelevantGroup = ({ step }) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation(); // ✅ get i18n for language detection

  const savedRelevant = useSelector(
    (state) => state.stepper.stepData[step]?.relevantSelected || "relevant"
  );
  const [relevantSelected, setRelevantSelected] = useState(savedRelevant || "relevant");

  useEffect(() => {
    setRelevantSelected(savedRelevant);
  }, [savedRelevant]);

  const optionsRelevant = [
    { id: "relevant", label: "Relevant", weight: "100%" },
    { id: "irrelevant", label: "Irrelevant", weight: "20%" },
  ];

  const handleRelevantSelect = (id) => {
    setRelevantSelected(id);
    dispatch(saveStepData({ step, data: { relevantSelected: id } }));
  };

  return (
    <div className="border-2 rounded-xl inline-flex flex-wrap gap-10 py-4 px-8">
      {optionsRelevant.map((option) => (
        <div
          key={option.id}
          className={`flex items-center gap-3 ${
            i18n.language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <Checkbox
            id={`${option.id}-${step}`}
            checked={relevantSelected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleRelevantSelect(option.id);
            }}
          />
          <Label htmlFor={`${option.id}-${step}`}>
            <span>{t(option.label)}</span> {/* ✅ translate label */}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default SelectRelevantGroup;
