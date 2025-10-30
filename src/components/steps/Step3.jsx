import { Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectVerifiedGroup from "../selectVerifiedGroup/SelectVerifiedGroup";

const experiences = [
  { experience: "None"},
  { experience: "1"},
  { experience: "2"},
  { experience: "3"},
  { experience: "4"},
  { experience: "5"},
  { experience: "6"},
  { experience: "7"},
  { experience: "8"},
  { experience: "9"},
  { experience: "10"},
  { experience: "11"},
  { experience: "12"},
  { experience: "13"},
  { experience: "14"},
  { experience: "15"},
  { experience: "16"},
  { experience: "17"},
  { experience: "18"},
  { experience: "19"},
  { experience: "20"},
  { experience: "21"},
  { experience: "22"},
  { experience: "23"},
  { experience: "24"},
  { experience: "25"},
  { experience: "26"},
  { experience: "27"},
  { experience: "28"},
  { experience: "29"},
  { experience: "30"},
];

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
          <span className="font-bold">Note: </span>
          For external experience gained within the Kingdom of Saudi Arabia,
          please attach the Mudad Wa Ujoor Certificate issued by the General
          Organization for Social Insurance (GOSI).
        </p>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup defaultValue="0" className="w-full">
          <Table className="relative">
            <TableHeader className="text-lg">
              <TableRow>
                <TableHead>Experience (Years)</TableHead>
                <TableHead className="text-right pr-10">Select</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-md">
              {experiences.map((experience) => (
                <TableRow key={experience.experience}>
                  <TableCell className="font-medium">
                    {experience.experience}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="radio-field p-2 border-0 pr-10 inline-flex justify-center text-center">
                      <RadioGroupItem
                        className="m-0"
                        value={experience.experience}
                        id={`exp-${experience.experience}`}
                      />
                      <Label
                        className="p-0"
                        htmlFor={`exp-${experience.experience}`}
                      ></Label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </div>

      <div className="max-w-xl flex flex-col gap-4">
        <SelectVerifiedGroup />
      </div>
    </>
  );
};

export default Step3;
