import {
  FileText,
  Award,
  TrendingUp,
  Lightbulb,
  CircleCheck,
} from "lucide-react";

const HowToUse = () => {
  const steps = [
    {
      step: "Step 1",
      title: "Complete the Grading Form",
      description:
        "Fill out all sections honestly, including education, certifications, experience, and language proficiency. Each section contributes to your final score.",
      icon: <FileText className="w-6 h-6" />,
      gradient: "linear-gradient(135deg, var(--blue-start), var(--purple-mid))",
    },
    {
      step: "Step 2",
      title: "Review Your Score",
      description:
        "After submission, view your detailed breakdown showing how each category contributes to your total score and recommended designation.",
      icon: <Award className="w-6 h-6" />,
      gradient: "linear-gradient(135deg, var(--purple-mid), var(--purple-end))",
    },
    {
      step: "Step 3",
      title: "Track Your Progress",
      description:
        "Visit the Progress page to see your grading history and identify areas for improvement over time.",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "linear-gradient(135deg, var(--purple-end), var(--pink))",
    },
  ];

  const scoring = [
    { label: "Education", color: "var(--blue)", value: "20%" },
    { label: "Certifications", color: "var(--violet)", value: "20%" },
    { label: "External Experience", color: "var(--purple)", value: "20%" },
    { label: "Management Experience", color: "var(--pink)", value: "25%" },
    { label: "English Proficiency", color: "var(--amber)", value: "15%" },
  ];

  const tips = [
    "Internal experience contributes to external experience at 0.5 years for each year of service.",
    "Update your grades regularly to track your improvement and career advancement.",
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-8 text-foreground">
      {/* Heading */}
      <div className="text-center space-y-3">
        <h1
          className="text-4xl md:text-5xl font-bold"
          style={{ color: "var(--primary-navy)" }}
        >
          How to Use the Portal
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Follow these simple steps to grade yourself and track your
          professional growth.
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
                <p style={{ color: "var(--text-muted)" }}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring Breakdown */}
      <div className="rounded-lg bg-card w-full text-card-foreground shadow-xl border ">
        <div className="p-6">
          <h3
            className="font-semibold flex items-center gap-2 text-2xl"
            style={{ color: "var(--primary-navy)" }}
          >
            <Award className="w-6 h-6" />
            Scoring Breakdown
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
                className="inline-flex items-center rounded-full text-white px-3 py-1 text-sm font-bold"
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
          <Lightbulb className="w-5 h-5 text-(--blue)" />
          Pro Tips
        </h3>
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex gap-3">
              <CircleCheck className="w-5 h-5 text-(--blue) shrink-0 mt-0.5" />
              <p style={{ color: "var(--text-dark)" }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
