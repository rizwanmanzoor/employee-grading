import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const LanguageToggle = () => {
  const [lang, setLang] = useState("english");

  const navigate = useNavigate();

  const handleArabic = () => {
    setLang("arabic");
    navigate("/comingsoon");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {lang === "arabic" ? <span>AR</span> : <span>EN</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("english")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleArabic}>Arabic</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
