import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ShieldCheck } from "lucide-react";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full items-center gap-4 py-4 md:py-8 text-foreground">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Employee Development Portal
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1
          className="text-2xl md:text-5xl font-bold leading-tight text-center"
          style={{ color: "var(--primary)" }}
        >
          Welcome to NOX Group Grading Portal
        </h1>

        <p
          className="text-md md:text-xl max-w-3xl mx-auto text-center"
          style={{ color: "var(--muted-foreground)" }}
        >
          Track your professional growth, identify development opportunities,
          and advance your career with transparent, data-driven insights.
        </p>

        <Link to="/how-to-use" className="mt-3">
          <Button size={"lg"} className="cursor-pointer">
            How to Use
          </Button>
        </Link>
      </div>

      <div
        className="rounded-lg border text-card-foreground max-w-4xl shadow-sm border-l-4 bg-card/50"
        style={{
          borderLeftColor: "hsl(var(--warning))",
        }}
      >
        <div className="p-6">
          <div className="flex gap-4">
            <ShieldCheck
              className="w-6 h-6 shrink-0 mt-1"
              style={{ color: "hsl(var(--warning))" }}
            />
            <div>
              <h4
                className="font-bold mb-2"
                style={{ color: "hsl(var(--primary))" }}
              >
                Confidentiality Notice
              </h4>
              <p
                className="leading-relaxed"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                All information submitted through this portal is strictly
                confidential and used solely for professional development
                purposes. Providing false information may result in disciplinary
                action. By using this system, you acknowledge and accept these
                terms.
              </p>

              <div className="flex md:items-center gap-3 mt-3">
                <Checkbox
                  id="terms"
                  checked={isChecked}
                  onCheckedChange={(checked) => setIsChecked(checked)}
                />
                <Label htmlFor="terms" className="text-md leading-4">
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
