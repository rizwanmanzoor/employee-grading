import { BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

      <div className="mt-5 mb-7">
        <RadioGroup
          defaultValue="option-basic"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="input-field">
            <RadioGroupItem value="option-basic" id="option-basic" />
            <Label htmlFor="option-basic">Basic</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-diploma" id="option-diploma" />
            <Label htmlFor="option-diploma">Diploma</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-bachelors" id="option-bachelors" />
            <Label htmlFor="option-bachelors">Bachelors</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-masters" id="option-masters" />
            <Label htmlFor="option-masters">Masters</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-phd" id="option-phd" />
            <Label htmlFor="option-phd">Phd</Label>
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

export default Step1;
