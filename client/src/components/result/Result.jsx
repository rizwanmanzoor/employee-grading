import { Button } from "../ui/button";
import { Repeat, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { ChartNoAxesCombined, Target } from "lucide-react";

const Result = () => {
  const employeeInfo = [
    { label: "Employee ID", value: "—" },
    { label: "Name", value: "—" },
    { label: "Current Designation", value: "Not specified" },
  ];

  const colors = [
    {
      color: "bg-blue-500",
      label: "Education",
      percent: "60%",
      score: "3.0",
    },
    {
      color: "bg-violet-500",
      label: "Certifications",
      percent: "65%",
      score: "7.2",
    },
    {
      color: "bg-purple-500",
      label: "External Experience",
      percent: "15%",
      score: "6.5",
    },
    {
      color: "bg-pink-500",
      label: "Management",
      percent: "45%",
      score: "5.0",
    },
    {
      color: "bg-amber-500",
      label: "English",
      percent: "65%",
      score: "4.0",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-5 text-foreground">
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
          Grade Calculated Successfully
        </span>
      </div>

      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className="p-8 flex flex-col md:flex-row items-center md:items-baseline justify-between gap-8">
          <div className="flex flex-col items-center space-y-1.5 p-6">
            <h3 className="font-semibold tracking-tight flex items-center gap-2 text-xl mb-5">
              {/* <Trophy className="w-5 h-5" /> */}
              Grades
            </h3>
            <div className="inline-block max-w-max px-8 py-4 rounded-2xl shadow-lg bg-card">
              <h2 className="text-4xl font-bold text-primary">4.0</h2>
            </div>

            <h3 className="font-semibold tracking-tight flex items-center gap-2 text-xl mt-7 mb-5">
              {/* <Trophy className="w-5 h-5" /> */}
              Score
            </h3>
            <div className="inline-block max-w-max px-8 py-4 rounded-2xl shadow-lg bg-card">
              <h2 className="text-4xl font-bold text-primary">4.0</h2>
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
                  Recommended Designation
                </p>
              </div>
              <p className="font-bold text-(--primary-amber)">Entry Level</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 my-2 w-full border rounded-2xl shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold tracking-tight flex items-center gap-2 text-2xl text-primary">
            <ChartNoAxesCombined />
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
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-xs text-primary bg-accent">
                    {item.percent}
                  </div>
                </div>
                <span className="font-bold text-lg">{item.score}</span>
              </div>
              {/* Progress bar */}
              <div className="h-3 bg-accent rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: item.percent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to={"/grading"}>
          <Button
            size="lg"
            className="w-full sm:w-auto cursor-pointer text-primary-foreground"
          >
            <Repeat className="w-5 h-5" />
            Try Again
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
