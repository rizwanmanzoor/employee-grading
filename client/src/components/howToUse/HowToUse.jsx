import {
  FileText,
  Award,
  TrendingUp,
  Lightbulb,
  CircleCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const HowToUse = () => {
  const { t, i18n } = useTranslation();

  const steps = [
    {
      step: t("how.step1"),
      title: t("how.title1"),
      description: t("how.desc1"),
      icon: <FileText className="w-6 h-6" />,
      gradient: "linear-gradient(135deg, var(--blue-start), var(--purple-mid))",
    },
    {
      step: t("how.step2"),
      title: t("how.title2"),
      description: t("how.desc2"),
      icon: <Award className="w-6 h-6" />,
      gradient: "linear-gradient(135deg, var(--purple-mid), var(--purple-end))",
    },
    {
      step: t("how.step3"),
      title: t("how.title3"),
      description: t("how.desc3"),
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "linear-gradient(135deg, var(--purple-end), var(--pink))",
    },
  ];

  const scoring = [
    { label: t("how.score.education"), color: "var(--blue)", value: "20%" },
    { label: t("how.score.certifications"), color: "var(--violet)", value: "20%" },
    { label: t("how.score.external"), color: "var(--purple)", value: "20%" },
    { label: t("how.score.management"), color: "var(--pink)", value: "25%" },
    { label: t("how.score.english"), color: "var(--amber)", value: "15%" },
  ];

  const tips = [
    t("how.tip1"),
    t("how.tip2"),
  ];

  return (
    <div
      className={`flex flex-col justify-center items-center gap-3 mt-8 text-foreground ${
        i18n.language === "ar" ? "text-right" : "text-left"
      }`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Heading */}
      <div className="text-center space-y-3">
        <h1
          className="text-4xl md:text-5xl font-bold"
          style={{ color: "var(--primary-navy)" }}
        >
          {t("how.heading")}
        </h1>

        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          {t("how.subheading")}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6 my-3">
        {steps.map((item, i) => (
          <div
            key={i}
            className="rounded-lg bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6 flex gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: item.gradient }}
              >
                {item.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold">
                    {item.step}
                  </span>

                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--primary-navy)" }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Breakdown */}
      <div className="rounded-lg bg-card w-full text-card-foreground shadow-xl border">
        <div className="p-6">
          <h3
            className="font-semibold flex items-center gap-2 text-2xl"
            style={{ color: "var(--primary-navy)" }}
          >
            <Award className="w-6 h-6" />
            {t("how.scoreBreakdown")}
          </h3>
        </div>

        <div className="p-6 pt-0 space-y-4">
          {scoring.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: item.color }}
              />
              <span
                className="flex-1 font-medium"
                style={{ color: "var(--text-dark)" }}
              >
                {item.label}
              </span>

              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold"
                style={{ background: item.color }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div
        className="w-full mt-2 rounded-lg border-l-4 p-6 bg-card/50 shadow-sm"
        style={{
          borderLeftColor: "hsl(var(--warning))",
        }}
      >
        <h3
          className="text-2xl font-semibold flex items-center gap-2 mb-4"
          style={{ color: "var(--primary-navy)" }}
        >
          <Lightbulb className="w-5 h-5" />
          {t("how.proTips")}
        </h3>

        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-3">
              <CircleCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <p style={{ color: "var(--text-dark)" }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
