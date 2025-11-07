import React, { useState,useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { saveStepData } from "@/features/stepper/stepperSlice";
import { AwardIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";
import UploadFile from "../uploadFile/UploadFile";

const Step2 = () => {
  const dispatch = useDispatch();
    // Fetch previously saved data from Redux
  const savedCertLevels = useSelector((state) => state.stepper.stepData.step2);

  // Initialize with saved data if exists, otherwise default
  const [certLevels, setCertLevels] = useState(
    savedCertLevels && Object.keys(savedCertLevels).length > 0
      ? savedCertLevels
      : { low: "1", medium: "1", high: "1" }
  );

  const handleChange = (category, value) => {
    const updated = { ...certLevels, [category]: value };
    setCertLevels(updated);
    dispatch(saveStepData({ step: "step2", data: updated }));
  };

   // Keep local state in sync if Redux updates (for example, on back navigation)
  useEffect(() => {
    if (savedCertLevels && Object.keys(savedCertLevels).length > 0) {
      setCertLevels(savedCertLevels);
    }
  }, [savedCertLevels]);

  // Save default data only once (first mount)
  useEffect(() => {
    if (!savedCertLevels || Object.keys(savedCertLevels).length === 0) {
      dispatch(saveStepData({ step: "step2", data: certLevels }));
    }
  }, []);

  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <AwardIcon />
        </div>
        <div>
          <h3 className="text-xl font-bold">Your Certifications</h3>
          <p className="text-sm text-gray-600">
            Select the number of certifications you have in each category
          </p>
        </div>
      </div>

      <div className="mt-5 mb-7">
        <div
          // className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
          className="grid grid-cols-1 md:grid-cols-1 gap-4 md:max-w-xl"
        >
          <div className="border-2 rounded-xl p-5">
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-xl font-bold">Low</h3>
              <p className="text-lg text-gray-600">
                Short courses (1 day - 2 weeks) <br />
                <small>Examples: Excel, PowerPoint, Word, PBI</small>
              </p>
            </div>

            <RadioGroup
              value={certLevels.low}
              onValueChange={(val) => handleChange("low", val)}
              defaultValue="option-1"
              className="grid grid-cols-[repeat(auto-fit,minmax(auto,50px))] gap-4"
            >
              {["1", "2", "3"].map((val, i) => (
                <div key={val} className="radio-field">
                  <RadioGroupItem value={val} id={`low-${val}`} />
                  <Label htmlFor={`low-${val}`}>{val}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="border-2 rounded-xl p-5">
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-xl font-bold">Medium</h3>
              <p className="text-lg text-gray-600">
                Certificates (2 weeks - 6 months) <br />
                <small>
                  Examples: Digital marketing, Project management, Cybersecurity
                </small>
              </p>
            </div>

            <RadioGroup
              value={certLevels.medium}
              onValueChange={(val) => handleChange("medium", val)}
              className="grid grid-cols-[repeat(auto-fit,minmax(auto,50px))] gap-4"
            >
              {["1", "2", "3"].map((val, i) => (
                <div key={val} className="radio-field">
                  <RadioGroupItem value={val} id={`medium-${val}`} />
                  <Label htmlFor={`medium-${val}`}>{val}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="border-2 rounded-xl p-5">
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-xl font-bold">High</h3>
              <p className="text-lg text-gray-600">
                Long-term certifications <br />
                <small>Examples: CPA, CA, CFA</small>
              </p>
            </div>

            <RadioGroup
              value={certLevels.high}
              onValueChange={(val) => handleChange("high", val)}
              className="grid grid-cols-[repeat(auto-fit,minmax(auto,50px))] gap-4"
            >
              {["1", "2"].map((val, i) => (
                <div key={val} className="radio-field">
                  <RadioGroupItem value={val} id={`high-${val}`} />
                  <Label htmlFor={`high-${val}`}>{val}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      <UploadFile step="step2" />

      <div className="max-w-xl flex flex-col gap-4 mt-5">
        <SelectVerifiedGroup step="step2" />
        <SelectRelevantGroup step="step2" />
      </div>
    </>
  );
};

export default Step2;
