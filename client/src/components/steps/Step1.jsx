import { BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import UploadFile from "../uploadFile/UploadFile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";

const Step1 = () => {
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
          defaultValue="option-basic"
          className="grid grid-cols-1 gap-4 md:max-w-xl"
        >
          <div className="input-field">
            <label htmlFor="option-basic">
              <RadioGroupItem value="option-basic" id="option-basic" />
              Basic
            </label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-diploma">
              <RadioGroupItem value="option-diploma" id="option-diploma" />
              Diploma
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-bachelors">
              <RadioGroupItem value="option-bachelors" id="option-bachelors" />
              Bachelors
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-masters">
              <RadioGroupItem value="option-masters" id="option-masters" />
              Masters
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-phd">
              <RadioGroupItem value="option-phd" id="option-phd" />
              Phd
            </Label>
          </div>
        </RadioGroup>
      </div>

      <UploadFile />

      <div className="max-w-xl flex flex-col gap-4 mt-5">
        <SelectVerifiedGroup />
        <SelectRelevantGroup />
      </div>
    </>
  );
};

export default Step1;
