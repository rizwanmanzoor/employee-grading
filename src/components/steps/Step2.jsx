import { AwardIcon } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from '../selectVerifiedGroup/SelectVerifiedGroup';
import SelectRelevantGroup from '../selectRelevantGroup/SelectRelevantGroup';

const Step2 = () => {
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <div className="border-2 rounded-xl p-5">
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-xl font-bold">Low</h3>
              <p className="text-sm text-gray-600">
                Short courses (1 day - 2 weeks) <br />
                <small>Examples: Excel, PowerPoint, Word, PBI</small>
              </p>
            </div>

            <RadioGroup
              defaultValue="option-0"
              className="grid grid-cols-[repeat(auto-fit,minmax(auto,50px))] gap-4"
            >
              <div className="radio-field">
                <RadioGroupItem value="option-0" id="option-0" />
                <Label htmlFor="option-0">0</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">1</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">2</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">3</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="border-2 rounded-xl p-5">
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-xl font-bold">Medium</h3>
              <p className="text-sm text-gray-600">
                Certificates (2 weeks - 6 months) <br />
                <small>
                  Examples: Digital marketing, Project management, Cybersecurity
                </small>
              </p>
            </div>

            <RadioGroup
              defaultValue="option-0"
              className="grid grid-cols-[repeat(auto-fit,minmax(auto,50px))] gap-4"
            >
              <div className="radio-field">
                <RadioGroupItem value="option-0" id="option-0" />
                <Label htmlFor="option-0">0</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">1</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">2</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">3</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="border-2 rounded-xl p-5">
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-xl font-bold">High</h3>
              <p className="text-sm text-gray-600">
                Long-term certifications <br />
                <small>Examples: CPA, CA, CFA</small>
              </p>
            </div>

            <RadioGroup
              defaultValue="option-0"
              className="grid grid-cols-[repeat(auto-fit,minmax(auto,50px))] gap-4"
            >
              <div className="radio-field">
                <RadioGroupItem value="option-0" id="option-0" />
                <Label htmlFor="option-0">0</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-1" id="option-1" />
                <Label htmlFor="option-1">1</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-2" id="option-2" />
                <Label htmlFor="option-2">2</Label>
              </div>
              <div className="radio-field">
                <RadioGroupItem value="option-3" id="option-3" />
                <Label htmlFor="option-3">3</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap">
        <SelectVerifiedGroup />
        <SelectRelevantGroup />
      </div>
    </>
  );
}

export default Step2