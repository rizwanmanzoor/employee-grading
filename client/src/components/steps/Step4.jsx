import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { UserCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UploadFile from "../uploadFile/UploadFile";
import { useTranslation } from "react-i18next";


const experiences = [
  { experience: "None"},
  { experience: "1"},
  { experience: "2"},
  { experience: "3"},
  { experience: "4"},
  { experience: "5"},
  { experience: "6"},
  { experience: "7"},
  { experience: "8"},
  { experience: "9"},
  { experience: "10"},
  { experience: "11"},
  { experience: "12"},
  { experience: "13"},
  { experience: "14"},
  { experience: "15"},
];

const Step4 = () => {

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  
    const isRTL = i18n.language === "ar";

  // Get saved data from Redux store
  const savedExperience = useSelector((state) => state.stepper.stepData.step4);

  // Initialize local state (default "None" if nothing saved)
  const [experience, setExperience] = useState(
    savedExperience && savedExperience.value ? savedExperience.value : "None"
  );

  // Handle experience change
  const handleExperienceChange = (value) => {
    setExperience(value);
    dispatch(saveStepData({ step: "step4", data: { value } }));
  };

  // Keep local state synced with Redux (for back navigation)
  useEffect(() => {
    if (savedExperience && savedExperience.value) {
      setExperience(savedExperience.value);
    }
  }, [savedExperience]);

  // Save default data only once on first mount
  useEffect(() => {
    if (!savedExperience || !savedExperience.value) {
      dispatch(saveStepData({ step: "step4", data: { value: experience } }));
    }
  }, []);
  return (
    <>
      <div className={`flex items-center gap-3 pb-4 border-b ${
          isRTL ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}>
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <UserCheck />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t("step4.title")}</h3>
          <p className="text-sm text-gray-600">
            {t("step4.subtitle")}
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className={`text-sm text-primary ${isRTL ? "text-right" : "text-left"}`}>
          <span className="font-bold">{t("step4.note_title")} </span>
          {t("step4.note_text")}
        </p>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup  
          value={experience}
          onValueChange={handleExperienceChange}  
          className="w-full"
          >
          <Table className="relative">
            <TableHeader className="text-lg">
              <TableRow>
                 <TableHead className={isRTL ? "text-right" : "text-left"}>
                  {t("step4.table_title")}
                </TableHead>
                <TableHead className="text-right pr-10">
                  {t("step4.table_select")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-md border">
              {experiences.map((experience) => (
                <TableRow key={experience.experience}>
                  <TableCell className="font-medium">
                    {experience.experience}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="radio-field p-2 border-0 pr-10 inline-flex justify-center text-center">
                      <RadioGroupItem
                        className="m-0"
                        value={experience.experience}
                        id={`exp-${experience.experience}`}
                      />
                      <Label
                        className="p-0"
                        htmlFor={`exp-${experience.experience}`}
                      ></Label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </div>

      <UploadFile step="step4" />

      <div className="max-w-xl flex flex-col gap-4 mt-5">
        <SelectVerifiedGroup step="step4" />
        <SelectRelevantGroup step="step4" />
      </div>
    </>
  );
};

export default Step4;
