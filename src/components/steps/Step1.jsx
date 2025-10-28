import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Paperclip } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";
import SelectRelevantGroup from "../selectRelevantGroup/SelectRelevantGroup";

const Step1 = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
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

        <div
          className="input-field inline-flex items-center p-1 w-full md:min-w-xl md:w-max overflow-hidden my-5"
          style={{
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
          }}
        >
          <div className="px-4 flex items-center">
            <Paperclip size={"18"} />
            <p className="text-sm ml-3">
              {fileName ? fileName : "No file selected"}
            </p>
          </div>

          <label
            htmlFor="uploadFile"
            className="text-sm font-medium px-3 py-2.5 outline-none rounded-md cursor-pointer ml-auto w-max block transition-colors"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary)")
            }
          >
            Upload File
          </label>

          <Input
            type="file"
            id="uploadFile"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 flex-wrap">
        <SelectVerifiedGroup />
        <SelectRelevantGroup />
      </div>
    </>
  );
};

export default Step1;
