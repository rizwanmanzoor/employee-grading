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
import ProtectedRoute from "@/routes/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/comingsoon" element={<ComingSoon />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/grading" element={<StepperForm />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/how-to-use" element={<HowToUsePage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
