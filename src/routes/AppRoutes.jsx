import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ResultPage from "@/pages/ResultPage";
import StepperForm from "@/pages/StepperForm";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/grading" element={<StepperForm />} />
        <Route path="/result" element={<ResultPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
