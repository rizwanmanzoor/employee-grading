import { Route, Routes } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";

import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/LoginPage";
import ResultPage from "@/pages/ResultPage";
import ComingSoon from "@/pages/ComingSoon";
import StepperForm from "@/pages/StepperForm";
import ProgressPage from "@/pages/ProgressPage";
import HowToUsePage from "@/pages/HowToUsePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<RootLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/grading" element={<StepperForm />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
    </Routes>
  );
};

export default AppRoutes;
