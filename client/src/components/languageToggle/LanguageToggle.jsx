// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// // import { useNavigate } from "react-router-dom";

// const LanguageToggle = () => {
//   const [lang, setLang] = useState("english");

//   //const navigate = useNavigate();
// const { i18n } = useTranslation();

//   // const handleArabic = () => {
//   //   setLang("arabic");
//   //   navigate("/comingsoon");
//   // };
// const handleArabic = () => {
//   setLang("arabic");
//   i18n.changeLanguage("ar");
// };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           {lang === "arabic" ? <span>AR</span> : <span>EN</span>}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setLang("english")}>
//           English
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={handleArabic}>Arabic</DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default LanguageToggle;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  // Initial language from localStorage or default "en"
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("appLanguage") || "english";
  });

  useEffect(() => {
    // Update i18n language and localStorage whenever lang changes
    if (lang === "arabic") {
      i18n.changeLanguage("ar");
      localStorage.setItem("appLanguage", "arabic");
    } else {
      i18n.changeLanguage("en");
      localStorage.setItem("appLanguage", "english");
    }
  }, [lang, i18n]);

  const handleArabic = () => setLang("arabic");
  const handleEnglish = () => setLang("english");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {lang === "arabic" ? "AR" : "EN"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEnglish}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={handleArabic}>Arabic</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;

