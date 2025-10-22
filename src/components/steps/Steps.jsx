import { AwardIcon, BookOpen, Briefcase, Globe, Layers, UserCheck, Users } from "lucide-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

export const steps = [
  { label: "Education", icon: <BookOpen />, content: <Step1 /> },
  { label: "Certification", icon: <AwardIcon />, content: <Step2 /> },
  { label: "External Experience - Excl Management", icon: <Briefcase />, content: <Step3 /> },
  { label: "External Experience - Management", icon: <UserCheck />, content: <Step4 /> },
  { label: "English", icon: <Globe />, content: <Step5 /> },
  { label: "Internal Experience - Excl Management", icon: <Layers />, content: <Step6 /> },
  { label: "Internal Experience - Management", icon: <Users />, content: <Step7 /> },
];

const Steps = () => {
  return <div>Steps Component Loaded</div>;
}

export default Steps