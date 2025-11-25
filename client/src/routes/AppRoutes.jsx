import { Route, Routes } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";

import HomePage from "@/pages/HomePage";
import LandingGateway from "@/pages/LandingGatewayPage";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/LoginPage";
import ResultPage from "@/pages/ResultPage";
import ComingSoon from "@/pages/ComingSoon";
import StepperForm from "@/pages/StepperForm";
import ProgressPage from "@/pages/ProgressPage";
import HowToUsePage from "@/pages/HowToUsePage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import GradingCriteriaPage from "@/pages/GradingCriteriaPage";
// admin home page
import AdminHomePage from "@/pages/AdminHomePage";
import EmployeeList from "@/components/admin/employeeList";


// employee pages
const employeePages = (
  <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
    <Route element={<RootLayout />}>
    <Route path="/home" element={<HomePage />} />
    <Route path="/gateway" element={<LandingGateway />} />
    <Route path="/grading" element={<StepperForm />} />
    <Route path="/result" element={<ResultPage />} />
    <Route path="/progress" element={<ProgressPage />} />
    <Route path="/how-to-use" element={<HowToUsePage />} />
    <Route path="/grading-criteria" element={<GradingCriteriaPage />} />
    </Route>
  </Route>
);

// admin pages
const adminPages = (
  <Route element={<RootLayout />}>
  <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
    <Route path="/admin" element={<AdminHomePage />} />
    <Route path="/employees" element={<EmployeeList />} />
  </Route>
  </Route>
);

const AppRoutes = () => {
  return (
    <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LoginPage />} />
    <Route path="/comingsoon" element={<ComingSoon />} />

    {/* Protected Routes */}
    {employeePages}
    {adminPages}

    {/* Unauthorized page */}
    <Route path="/unauthorized" element={<NotFound />} />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
};

export default AppRoutes;
