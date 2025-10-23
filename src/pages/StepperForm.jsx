import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { steps } from "../components/steps/Steps";
import Stepper from "@/components/stepper/Stepper";
import { ScrollArea } from "@/components/ui/scroll-area";

const ButtonLabels = {
  BACK: "Back",
  NEXT: "Next",
  SUBMIT: "Submit",
};

const StepperForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep < steps.length - 1;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Stepper Header */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <ScrollArea className="w-full overflow-hidden">
        <div className="p-6 my-4 border rounded-2xl shadow-sm md:h-[calc(100vh-42vh)] overflow-y-auto custom-scroll">
          {steps[currentStep].content}
        </div>
      </ScrollArea>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Button
          disabled={isFirstStep}
          variant={"outline"}
          className={"px-6 py-2"}
          onClick={handleBack}
        >
          <span>{ButtonLabels.BACK}</span>
        </Button>

        {isLastStep ? (
          <Button className={"px-6 py-2"} onClick={handleNext}>
            <span>{ButtonLabels.NEXT}</span>
          </Button>
        ) : (
          <Button
            className={"px-6 py-2"}
            onClick={() => toast.success("Form Submitted Successfully!")}
          >
            <span>{ButtonLabels.SUBMIT}</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default StepperForm;
