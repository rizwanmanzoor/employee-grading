import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ComingSoon = () => {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">Feature Coming Soon</h1>
      <Link to={"/home"}>
        <Button>
          <ArrowUpLeft />
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default ComingSoon;
