import { Layers } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";

const Step6 = () => {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Layers />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            Internal Experience (Excluding Management)
          </h3>
          <p className="text-sm text-gray-600">
            Select your years of internal non-management experience
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-primary">
          <span className="font-medium">Note:</span> Internal experience
          contributes to external experience calculations at 0.5 years per year
          of service.
        </p>
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
            <Label htmlFor="option-1year">
              <RadioGroupItem value="option-1year" id="option-1year" />1 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-2year">
              <RadioGroupItem value="option-2year" id="option-2year" />2 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-3year">
              <RadioGroupItem value="option-3year" id="option-3year" />3 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-4year">
              <RadioGroupItem value="option-4year" id="option-4year" />4 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-5year">
              <RadioGroupItem value="option-5year" id="option-5year" />5 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-6year">
              <RadioGroupItem value="option-6year" id="option-6year" />6 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-7year">
              <RadioGroupItem value="option-7year" id="option-7year" />7 year
            </Label>
          </div>
          <div className="input-field">
            <Label htmlFor="option-8year">
              <RadioGroupItem value="option-8year" id="option-8year" />8 year
            </Label>
          </div>
        </RadioGroup>
      </div>

      <SelectVerifiedGroup />
    </>
  );
};

export default Step6;
