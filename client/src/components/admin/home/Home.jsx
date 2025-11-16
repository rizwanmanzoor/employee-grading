import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

    const isRTL = i18n.language === "ar";

  useEffect(() => {
    document.body.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <div className={`flex flex-col justify-center h-full items-center gap-4 py-4 md:py-8 text-foreground ${
        isRTL ? "direction-rtl" : "direction-ltr"
      }`}>
      
      {/* Portal Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
           {t("home.badge")}
        </span>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center gap-2">
        <h1
          className="text-2xl md:text-5xl font-bold leading-tight text-center"
          style={{ color: "var(--primary)" }}
        >
           {t("home.title")}
        </h1>

        <p
          className="text-md md:text-xl max-w-3xl mx-auto text-center"
          style={{ color: "var(--muted-foreground)" }}
        >
           {t("home.subtitle")}
        </p>

        {/* Employee List Button */}
        <Button
          size={"lg"}
          className="mt-3 cursor-pointer"
          onClick={() => navigate("/employees")}
        >
          {t("home.employee_list_button")}
        </Button>
      </div>
    </div>
  );
};

export default Home;
