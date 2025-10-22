import { Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Step3 = () => {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <Briefcase />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            External Experience (Excluding Management)
          </h3>
          <p className="text-sm text-gray-600">
            Select your years of external non-management experience
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-primary">
          <span className="font-medium">Note:</span> Internal experience
          contributes to external experience at 0.5 years per year of service.
        </p>
      </div>

      <div className="mt-5 mb-7"></div>

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

export default Step3;
