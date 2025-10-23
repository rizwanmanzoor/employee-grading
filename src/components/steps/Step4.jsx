import { UserCheck } from "lucide-react";
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
import SelectOptionGroup from "../selectOptionGroup/SelectOptionGroup";

const experiences = [
  {
    experience: "0",
    grade: "1.34",
  },
  {
    experience: "1",
    grade: "2.68",
  },
  {
    experience: "2",
    grade: "4.02",
  },
  {
    experience: "3",
    grade: "5.36",
  },
  {
    experience: "4",
    grade: "6.7",
  },
  {
    experience: "5",
    grade: "8.04",
  },
  {
    experience: "6",
    grade: "9.38",
  },
  {
    experience: "7",
    grade: "10.72",
  },
  {
    experience: "8",
    grade: "12.06",
  },
  {
    experience: "9",
    grade: "13.4",
  },
  {
    experience: "10",
    grade: "14.74",
  },
];

const Step4 = () => {
  return (
    <>
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center">
          <UserCheck />
        </div>
        <div>
          <h3 className="text-xl font-bold">External Management Experience</h3>
          <p className="text-sm text-gray-600">
            Select your years of external management experience
          </p>
        </div>
      </div>

      <div className="mt-5 bg-accent/70 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-primary">
          <span className="font-medium">Note:</span> Internal experience
          contributes to external experience at 0.5 years per year of service.
        </p>
      </div>

      <div className="mt-5 mb-7">
        <RadioGroup defaultValue="0" className="w-full">
          <Table className="relative">
            <TableHeader className="sticky top-0">
              <TableRow>
                <TableHead>Management Experience (Years)</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Select</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {experiences.map((experience) => (
                <TableRow key={experience.experience}>
                  <TableCell className="font-medium">
                    {experience.experience}
                  </TableCell>
                  <TableCell>{experience.grade}</TableCell>
                  <TableCell className="text-right">
                    <div className="radio-field inline-flex">
                      <RadioGroupItem
                        value={experience.experience}
                        id={`exp-${experience.experience}`}
                      />
                      <Label htmlFor={`exp-${experience.experience}`}></Label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RadioGroup>
      </div>

      <SelectOptionGroup />
    </>
  );
};

export default Step4;
