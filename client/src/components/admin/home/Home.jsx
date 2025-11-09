import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center h-full items-center gap-4 py-4 md:py-8 text-foreground">
      
      {/* Portal Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-sm">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Employee Development Portal
        </span>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col items-center justify-center gap-2">
        <h1
          className="text-2xl md:text-5xl font-bold leading-tight text-center"
          style={{ color: "var(--primary)" }}
        >
          Welcome to NOX Group Admin Portal
        </h1>

        <p
          className="text-md md:text-xl max-w-3xl mx-auto text-center"
          style={{ color: "var(--muted-foreground)" }}
        >
          Manage employees, track professional growth, and ensure data-driven
          insights across the organization.
        </p>

        {/* Employee List Button */}
        <Button
          size={"lg"}
          className="mt-3 cursor-pointer"
          onClick={() => navigate("/employees")}
        >
          Employee List
        </Button>
      </div>
    </div>
  );
};

export default Home;
