import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { steps } from "../components/steps/Steps";
import Stepper from "@/components/stepper/Stepper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep, submitFinalForm } from "@/features/stepper/stepperSlice";

import { useNavigate } from "react-router-dom";

const ButtonLabels = {
  BACK: "Back",
  NEXT: "Next",
  SUBMIT: "Submit",
};

const StepperForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { currentStep, stepData, loading } = useSelector((state) => state.stepper);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep >= steps.length - 1;

  const handleNext = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handleBack = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(submitFinalForm(stepData)).unwrap();
      toast.success("Form Submitted Successfully!");
      navigate("/result");
    } catch (error) {
      toast.error(error || "Submission failed!");
    }
  };

  return (
    <>
      {/* Stepper Header */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <ScrollArea className="w-full overflow-hidden">
        <div className="p-6 my-4 border rounded-2xl shadow-sm md:h-[calc(100vh-45vh)] overflow-y-auto custom-scroll">
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
          <Button
            className={"px-6 py-2"}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : ButtonLabels.SUBMIT}
          </Button>
        ) : (
          <Button className={"px-6 py-2"} onClick={handleNext}>
            {ButtonLabels.SUBMIT}
          </Button>
        )}
      </div>
    </>
  );
};

export default StepperForm;
