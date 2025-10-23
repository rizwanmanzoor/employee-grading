import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import HowToUsePage from "@/pages/HowToUsePage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import ResultPage from "@/pages/ResultPage";
import StepperForm from "@/pages/StepperForm";
import { Route, Routes, useLocation } from "react-router-dom";

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/grading" element={<StepperForm />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
