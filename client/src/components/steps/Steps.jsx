import {
  AwardIcon,
  BookOpen,
  Briefcase,
  Globe,
  Layers,
  UserCheck,
  Users,
} from "lucide-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

// label is now a function: (t) => t("key")
export const steps = [
  { label: (t) => t("education"), icon: <BookOpen />, weight: "20%", content: <Step1 /> },
  { label: (t) => t("certification"), icon: <AwardIcon />, weight: "20%", content: <Step2 /> },
  { label: (t) => t("external_experience_excl"), icon: <Briefcase />, weight: "20%", content: <Step3 /> },
  { label: (t) => t("external_experience_mgmt"), icon: <UserCheck />, weight: "25%", content: <Step4 /> },
  { label: (t) => t("english"), icon: <Globe />, weight: "15%", content: <Step5 /> },
  { label: (t) => t("internal_experience_excl"), icon: <Layers />, content: <Step6 /> },
  { label: (t) => t("internal_experience_mgmt"), icon: <Users />, content: <Step7 /> },
];
