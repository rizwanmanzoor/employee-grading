import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";

const Step5 = () => {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Globe />
        </div>
        <div>
          <h3 className="text-xl font-bold">English Proficiency</h3>
          <p className="text-sm text-gray-600">
            Select your English language proficiency level
          </p>
        </div>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup
          defaultValue="option-none"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="input-field">
            <Label htmlFor="option-none">
              <RadioGroupItem value="option-none" id="option-none" />
              None
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-basic">
              <RadioGroupItem value="option-basic" id="option-basic" />
              Basic
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-average">
              <RadioGroupItem value="option-average" id="option-average" />
              Average
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-good">
              <RadioGroupItem value="option-good" id="option-good" />
              Good
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-excellent">
              <RadioGroupItem value="option-excellent" id="option-excellent" />
              Excellent
            </Label>
          </div>
        </RadioGroup>
      </div>

      <SelectVerifiedGroup />
    </>
  );
};

export default Step5;
