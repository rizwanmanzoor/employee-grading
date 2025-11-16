import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { useTranslation } from "react-i18next";

const SelectVerifiedGroup = ({ step }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const savedVerified = useSelector(
    (state) => state.stepper.stepData[step]?.verifiedSelected || ""
  );
  const [verifiedSelected, setVerifiedSelected] = useState(savedVerified || "");

  useEffect(() => {
    setVerifiedSelected(savedVerified);
  }, [savedVerified]);

  const optionsVerified = [
    { id: "verified", label: "Verified", weight: "100%" },
    { id: "unverified", label: "Unverified", weight: "25%" },
  ];

  const handleVerifiedSelect = (id) => {
    setVerifiedSelected(id);
    dispatch(saveStepData({ step, data: { verifiedSelected: id } }));
  };

  return (
    <div className="border-2 rounded-xl inline-flex flex-wrap gap-10 py-4 px-8">
      {optionsVerified.map((option) => (
        <div
          key={option.id}
          className={`flex items-center gap-3 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
        >
          <Checkbox
            id={`${option.id}-${step}`}
            checked={verifiedSelected === option.id}
            onCheckedChange={(checked) => {
              if (checked) handleVerifiedSelect(option.id);
            }}
          />
          <Label htmlFor={`${option.id}-${step}`}>
            <span>{t(option.label)}</span>
          </Label>
        </div>
      ))}
    </div>
  );
};

export default SelectVerifiedGroup;
