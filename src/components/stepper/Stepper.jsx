import { CheckIcon } from "lucide-react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex overflow-x-auto items-center justify-between gap-4 px-4 py-6 border rounded-2xl bg-card text-card-foreground relative">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={index}
            className="flex flex-col items-center text-center flex-1 group"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
              ${
                isCompleted
                  ? "bg-primary border-primary text-primary-foreground"
                  : isActive
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground group-hover:border-primary/60"
              }`}
            >
              {isCompleted ? <CheckIcon size={18} /> : index + 1}
            </div>

            <span
              className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary/80"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
