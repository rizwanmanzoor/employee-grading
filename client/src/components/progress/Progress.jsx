import { TrendingUp, Award, Calendar } from "lucide-react";
import React from "react";
import { CartesianGrid, LabelList, Line, LineChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "january", scores: 2.5 },
  { month: "march", scores: 4.2 },
  { month: "july", scores: 5.8 },
  { month: "october", scores: 4.5 },
  { month: "december", scores: 8.0 },
];

const chartConfig = {
  scores: {
    label: "Score",
    color: "var(--primary)",
  },
};

const gradeCard = [
  { label: "Edu", value: "1.4" },
  { label: "Cert", value: "2.0" },
  { label: "Ext", value: "1.0" },
  { label: "Mgmt", value: "0.0" },
  { label: "Eng", value: "0.0" },
];

const cardsData = [
  {
    grade: "F",
    score: "4.4",
    date: "Oct 21, 2025",
    current: "Not specified",
    target: "Entry Level",
  },
  {
    grade: "A",
    score: "8.9",
    date: "Oct 19, 2025",
    current: "Intermediate",
    target: "Expert",
  },
  {
    grade: "B",
    score: "6.2",
    date: "Oct 10, 2025",
    current: "Junior",
    target: "Mid Level",
  },
];

const Progress = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-5 text-foreground">
      <div className="text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Track Progress
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          style={{ color: "var(--primary)" }}
        >
          Progress Tracking
        </h1>

        <p
          className="text-lg md:text-xl max-w-3xl mx-auto"
          style={{ color: "var(--muted-foreground)" }}
        >
          Monitor your professional development over time
        </p>
      </div>

      {/* chart */}
      <div className="w-full mt-5 flex flex-col justify-center items-center gap-3">
        <Card className="w-full md:w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="flex gap-3 items-center">
              <TrendingUp className="w-4 h-4 text-primary" />
              Score Progression
            </CardTitle>
            {/* <CardDescription>January - December 2024</CardDescription> */}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 24,
                  left: 24,
                  right: 24,
                }}
              >
                <CartesianGrid vertical={false} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      nameKey="scores"
                      hideLabel
                    />
                  }
                />
                <Line
                  dataKey="scores"
                  type="natural"
                  stroke="var(--color-scores)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-scores)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="bottom"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                    dataKey="month"
                    // formatter={() => chartConfig[value]?.label}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* progress-card */}
      <div className="w-full md:w-5xl mt-5 mb-3 rounded-lg bg-card text-card-foreground border-0 shadow-xl">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Grading History
          </h3>
        </div>

        <div className="p-6 pt-0 space-y-4">
          <div className="grid gap-4">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="border-2 rounded-xl p-4 hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="inline-flex items-center rounded-full border text-lg px-3 py-1 font-bold bg-destructive/10 text-destructive border-destructive/20">
                        {card.grade}
                      </div>

                      <span className="text-2xl font-bold text-primary">
                        {card.score}
                      </span>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {card.date}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current:</span>
                        <span className="font-medium ml-2">{card.current}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target:</span>
                        <span className="font-medium ml-2">{card.target}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Stats */}
                  <div className="grid grid-cols-5 gap-2">
                    {gradeCard.map((item, i) => (
                      <div
                        key={i}
                        className="text-center p-2 bg-muted rounded-lg"
                      >
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-bold text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
