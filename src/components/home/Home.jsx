import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);

  const features = [
    {
      icon: <Award className="w-7 h-7" />,
      gradient: "from-blue-500 to-violet-500",
      title: "View Your Grades",
      description:
        "Access your recent and historical grading results instantly.",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      gradient: "from-violet-500 to-purple-500",
      title: "Track Progress",
      description: "Monitor your professional development journey over time.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      gradient: "from-purple-500 to-pink-500",
      title: "Secure Access",
      description:
        "Your data is protected with enterprise-grade security, 24/7.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-5 text-foreground">
      <div className="text-center space-y-6">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Employee Development Portal
          </span>
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold leading-tight"
          style={{ color: "var(--primary)" }}
        >
          Welcome to Your Grading Portal
        </h1>

        <p
          className="text-lg md:text-xl max-w-3xl mx-auto"
          style={{ color: "var(--muted-foreground)" }}
        >
          Track your professional growth, identify development opportunities,
          and advance your career with transparent, data-driven insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link to="/grading">
            <Button
              className="inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl"
              // style={{
              //   background:
              //     "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              // }}
            >
              <FileText className="w-5 h-5 mr-2" />
              Start Grading
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <Link to="/how-to-use">
            <Button
              variant="outline"
              className="inline-flex items-center justify-center gap-2 font-medium border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 text-base px-8 py-6 rounded-xl transition-colors"
            >
              How to Use
            </Button>
          </Link>
        </div>
      </div>

      {/* cards */}
      <div className="grid md:grid-cols-3 gap-6 my-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg bg-card text-card-foreground h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="p-6">
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-accent group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--primary)" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* notice */}
      <div
        className="rounded-lg border text-card-foreground shadow-sm border-l-4 bg-card/50 mb-4"
        style={{
          borderLeftColor: "hsl(var(--warning))",
        }}
      >
        <div className="p-6">
          <div className="flex gap-4">
            {/* Icon */}
            <ShieldCheck
              className="w-6 h-6 shrink-0 mt-1"
              style={{ color: "hsl(var(--warning))" }}
            />

            {/* Text */}
            <div>
              <h4
                className="font-bold mb-2"
                style={{ color: "hsl(var(--primary))" }}
              >
                Confidentiality Notice
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                All information submitted through this portal is strictly
                confidential and used solely for professional development
                purposes. Providing false information may result in disciplinary
                action. By using this system, you acknowledge and accept these
                terms.
              </p>

              <div className="flex items-center gap-3 mt-3">
                <Checkbox
                  id="terms"
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked)}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm"
                >
                  I have read and accept the terms and conditions stated above
                </Label>
              </div>

              <Button disabled={!isChecked} className="mt-5 cursor-pointer">
                <Link to="/grading">Start Grading</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
