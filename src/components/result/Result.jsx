import { Target } from "lucide-react";
import { Button } from "../ui/button";
import { ShieldCheck } from "lucide-react";
import { TrendingUp, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Result = () => {
  const items = [
    "Education",
    "Certifications",
    "External Exp",
    "External Mgmt",
    "English",
    "Internal Exp",
    "Internal Mgmt",
  ];

  const colors = [
    {
      color: "bg-blue-500",
      label: "Education",
      percent: "20%",
      score: "2.0",
      width: "8%",
    },
    {
      color: "bg-violet-500",
      label: "Certifications",
      percent: "20%",
      score: "0.0",
      width: "0%",
    },
    {
      color: "bg-purple-500",
      label: "External Experience",
      percent: "20%",
      score: "0.0",
      width: "0%",
    },
    {
      color: "bg-pink-500",
      label: "Management",
      percent: "25%",
      score: "0.0",
      width: "0%",
    },
    {
      color: "bg-amber-500",
      label: "English",
      percent: "15%",
      score: "0.0",
      width: "0%",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-5 text-foreground">
      {/* ✅ Grade Success Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--bg-card) border border-(--primary-green) shadow-sm">
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
        <span className="text-sm font-medium text-(--primary-green)">
          Grade Calculated Successfully
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-(--primary-navy)">
        Your Results
      </h1>

      {/* ✅ Final Grade Card */}
      {/* <div className="p-4 my-2 w-full border border-(--border-color) rounded-2xl shadow-sm bg-(--bg-card)"> */}
      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-(--text-muted) mb-2">Your Final Grade</p>
            <div className="inline-block px-8 py-4 rounded-2xl text-6xl font-bold text-muted shadow-lg bg-destructive">
              F
            </div>
            <p className="text-2xl font-bold mt-4 text-(--primary-navy)">
              2.0 / 100
            </p>
          </div>

          <div className="flex-1 space-y-4 w-full">
            {[
              { label: "Employee ID", value: "—" },
              { label: "Name", value: "—" },
              { label: "Current Designation", value: "Not specified" },
            ].map((item, i) => (
              <div
                key={i}
                // className="bg-(--bg-muted) p-4 rounded-xl border border-(--border-color)"
                className="bg-accent p-4 rounded-xl"
              >
                <p className="text-sm text-(--text-muted) mb-1">{item.label}</p>
                <p className="font-bold">{item.value}</p>
              </div>
            ))}

            <div className="p-4 rounded-xl border">
              {/* <div className="bg-(--bg-muted) p-4 rounded-xl border border-(--primary-amber)"> */}
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-destructive" />
                <p className="text-sm font-medium text-(--primary-amber)">
                  Recommended Designation
                </p>
              </div>
              <p className="font-bold text-(--primary-amber)">Entry Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Verification Status */}
      {/* <div className="p-4 my-2 w-full border border-(--border-color) rounded-2xl shadow-sm bg-(--bg-card)"> */}
      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight flex items-center gap-2 text-xl text-(--primary-navy)">
            <ShieldCheck className="w-5 h-5 text-(--primary-green)" />
            Verification Status
          </h3>
        </div>

        <div className="p-6 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((title) => (
              // <div key={title} className="p-3 bg-(--bg-muted) rounded-lg">
              <div key={title} className="p-3 bg-accent rounded-lg">
                <p className="text-xs text-(--text-muted) mb-2">{title}</p>
                <div className="flex gap-1">
                  {["✗ Ver", "✗ Rel"].map((tag) => (
                    <div
                      key={tag}
                      // className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs bg-(--bg-card) text-(--text-muted)"
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs text-(--text-muted)"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Score Breakdown */}
      {/* <div className="p-4 my-2 w-full border border-(--border-color) rounded-2xl shadow-sm bg-(--bg-card)"> */}
      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight flex items-center gap-2 text-2xl text-(--primary-navy)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary-blue)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
              <circle cx="12" cy="8" r="6" />
            </svg>
            Score Breakdown
          </h3>
        </div>

        <div className="p-6 pt-0 space-y-4">
          {colors.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs text-(--primary-navy) bg-accent">
                    {item.percent}
                  </div>
                </div>
                <span className="font-bold text-lg">{item.score}</span>
              </div>
              <div className="h-3 bg-accent rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* <Button variant="outline" className="w-full sm:w-auto">
          <TrendingUp className="w-5 h-5" />
          View Progress
        </Button> */}

        <Link to={"/grading"}>
          <Button
            className="w-full sm:w-auto cursor-pointer text-primary-foreground"
            // style={{
            //   background: "var(--gradient-primary)",
            // }}
          >
            <Trophy className="w-5 h-5" />
            Test Again
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
