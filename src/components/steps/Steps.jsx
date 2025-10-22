import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

export const steps = [
  { label: "Education", content: <Step1 /> },
  { label: "Certification", content: <Step2 /> },
  { label: "Experience", content: <Step3 /> },
  { label: "Skills", content: <Step4 /> },
  { label: "Projects", content: <Step5 /> },
  { label: "Achievements", content: <Step6 /> },
  { label: "Summary", content: <Step7 /> },
];

const Steps = () => {
  return <div>Steps Component Loaded</div>;
}

export default Steps