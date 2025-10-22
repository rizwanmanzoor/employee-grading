import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
            <RadioGroupItem value="option-none" id="option-none" />
            <Label htmlFor="option-none">None</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-basic" id="option-basic" />
            <Label htmlFor="option-basic">Basic</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-average" id="option-average" />
            <Label htmlFor="option-average">Average</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-good" id="option-good" />
            <Label htmlFor="option-good">Good</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-excellent" id="option-excellent" />
            <Label htmlFor="option-excellent">Excellent</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="verified" />
          <Label htmlFor="verified">Verified</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="unverified" />
          <Label htmlFor="unverified">Unverified</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="relevant" />
          <Label htmlFor="relevant">Relevant</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox id="irrelevant" />
          <Label htmlFor="irrelevant">Irrelevant</Label>
        </div>
      </div>
    </>
  );
};

export default Step5;
