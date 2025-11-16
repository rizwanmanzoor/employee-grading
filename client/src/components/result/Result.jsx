import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeScores } from "@/features/scores/scoreSlice";
import { Button } from "../ui/button";
import { Repeat, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartNoAxesCombined, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Result = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
   const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { employee, calculateScores, loading, error } = useSelector(
    (state) => state.scores
  );

  useEffect(() => {
    dispatch(fetchEmployeeScores());
  }, [dispatch]);


  // ✅ Loader
  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-lg font-bold">{t("result_page.loading")}</p>
      </div>
    );

  // ✅ Error
  if (error)
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );

  // ✅ Data Formatting
  const employeeInfo = employee
    ? [
        { label: t("result_page.employee_info.employee_id"), value: employee.employee_no },
        { label: t("result_page.employee_info.name"), value: employee.name },
        { label: t("result_page.employee_info.designation"), value: employee.designation }
      ]
    : [];

  const colorMap = {
    education: "bg-blue-500",
    certifications: "bg-violet-500",
    external_experience: "bg-purple-500",
    management: "bg-pink-500",
    english: "bg-amber-500",
  };

  const scoreBreakdown = calculateScores
    ? Object.entries(calculateScores).filter(([key]) => key !== "total")
    : [];

  const totalGrade = calculateScores?.total?.grade || 0;
  const totalScore = calculateScores?.total?.score || 0;
  const recommededDesignation = calculateScores?.recommended_designation?.main || "";
  const subCategoryGrade = calculateScores?.recommended_designation?.sub || "";
  const recommededGrade = calculateScores?.recommended_designation?.grade || "";



  const handleTryAgain = () => {
    navigate("/grading");
    window.location.reload(); // state reset
  };

  return (
    <div className={`flex flex-col justify-center items-center gap-3 mt-5 text-foreground ${isRTL ? "text-right" : "text-left"}`}>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-sparkles w-4 h-4 text-green-600"
        >
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
          <path d="M20 3v4"></path>
          <path d="M22 5h-4"></path>
          <path d="M4 17v2"></path>
          <path d="M5 18H3"></path>
        </svg>
        <span className="text-sm font-medium">
          {t("result_page.grade_success")}
        </span>
      </div>

      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className={`p-8 flex flex-col md:flex-row items-center md:items-baseline justify-between gap-8 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className="flex flex-col items-center space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight flex items-center gap-2 text-xl mb-5">
              {/* <Trophy className="w-5 h-5" /> */}
              {t("result_page.grades")}
            </h3>
            <div className="inline-block max-w-max px-8 py-4 rounded-2xl shadow-lg bg-card">
              <h2 className="text-4xl font-bold text-primary">{recommededGrade}</h2>
            </div>

            <h3 className="font-semibold tracking-tight flex items-center gap-2 text-xl mt-7 mb-5">
              {/* <Trophy className="w-5 h-5" /> */}
               {t("result_page.score")}
            </h3>
            <div className="inline-block max-w-max px-8 py-4 rounded-2xl shadow-lg bg-card">
              <h2 className="text-4xl font-bold text-primary">{totalScore}</h2>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            {employeeInfo.map((item, i) => (
              <div key={i} className="bg-muted p-4 rounded-xl">
                <p className="text-sm text-(--text-muted) mb-1">{item.label}</p>
                <p className="font-bold">{item.value}</p>
              </div>
            ))}

            <div className="p-4 rounded-xl border"> 
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-destructive" />
                <p className="text-sm font-medium text-(--primary-amber)">
                 {t("result_page.recommended_designation")}
                </p>

              </div>

              <span className="font-bold px-2 py-0.5 text-(--primary-amber)">
                {recommededDesignation}
              </span>
              {/* D3 Label Here */}
                {subCategoryGrade && (
                  <span className="border px-2 py-0.5 text-xs bg-accent rounded-full">
                    {subCategoryGrade}
                  </span>
                )}
            </div>

          </div>
        </div>
      </div>

      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight flex items-center gap-2 text-2xl text-primary">
            <ChartNoAxesCombined />
           {t("result_page.score_breakdown")}
          </h3>
        </div>

        <div className="p-6 pt-0 space-y-4">
          

          {scoreBreakdown.slice(0, 5).map(([key, item], i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colorMap[key]}`} />
                  <span className="font-medium">
                    {
                      t(key.replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase()))
                    }
                  </span>
                  <div className="border px-2 py-0.5 text-xs bg-accent rounded-full">
                    {item.grade}%
                  </div>
                </div>
                <span className="font-bold text-lg">{item.score}</span>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-accent rounded-full overflow-hidden">
                <div
                  className={`h-full ${colorMap[key]} rounded-full`}
                  style={{ width: `${item.grade}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
         <Button
      size="lg"
      className="w-full sm:w-auto cursor-pointer text-primary-foreground"
      onClick={handleTryAgain}
    >
      <Repeat className="w-5 h-5" />
       {t("result_page.try_again")}
    </Button>
      </div>
    </div>
  );
};

export default Result;
