import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedOption } from "@/features/appFlag/appFlagSlice";
import { useTranslation } from "react-i18next";
import { Calculator, ClipboardList } from "lucide-react";
import { Button } from "../ui/button";

const LandingGateway = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleOptionClick = (option) => {
    dispatch(setSelectedOption(option));
    navigate("/home");
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-8 p-8 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Note Box - Full Width Above Cards */}
      {/* <div className="bg-accent/70 p-4 rounded-lg border border-primary/20 w-full md:w-[700px]">
        <p className={`text-sm text-primary ${isRTL ? "text-right" : "text-left"}`}>
          <span className="font-bold">{t("step3.note_title")} </span>
          {t("step3.note_text")}
        </p>
      </div> */}

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">

        {/* Calculator Card */}
        <div className="flex flex-col items-center justify-between p-6 w-80 h-64 bg-card border rounded-2xl shadow-lg">
          <Calculator className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-xl font-bold mb-4">{t("calculator")}</h2>
          <Button onClick={() => handleOptionClick("calculator")}>
            {t("open_calculator")}
          </Button>
        </div>

        {/* Grading Card */}
        <div className="flex flex-col items-center justify-between p-6 w-80 h-64 bg-card border rounded-2xl shadow-lg">
          <ClipboardList className="w-12 h-12 text-primary mb-4" />
          <h2 className="text-xl font-bold mb-4">{t("grading")}</h2>
          <Button onClick={() => handleOptionClick("grading")}>
            {t("start_grading")}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default LandingGateway;
