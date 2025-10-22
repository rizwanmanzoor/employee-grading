import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Step7 = () => {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Users />
        </div>
        <div>
          <h3 className="text-xl font-bold">Internal Management Experience</h3>
          <p className="text-sm text-gray-600">
            Select your years of internal management experience
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-primary">
          <span className="font-medium">Note:</span> Internal management
          experience is weighted at 25% of your total score.
        </p>
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
            <RadioGroupItem value="option-1year" id="option-1year" />
            <Label htmlFor="option-1year">1 year</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-2year" id="option-2year" />
            <Label htmlFor="option-2year">2 year</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-3year" id="option-3year" />
            <Label htmlFor="option-3year">3 year</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-4year" id="option-4year" />
            <Label htmlFor="option-4year">4 year</Label>
          </div>
          <div className="input-field">
            <RadioGroupItem value="option-5year" id="option-5year" />
            <Label htmlFor="option-5year">5 year</Label>
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

export default Step7;
