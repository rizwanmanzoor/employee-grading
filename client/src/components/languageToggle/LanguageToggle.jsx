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


import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const [lang, setLang] = useState("english");
  const { i18n } = useTranslation();

  const handleArabic = () => {
    setLang("arabic");
    i18n.changeLanguage("ar");
  };

  const handleEnglish = () => {
    setLang("english");
    i18n.changeLanguage("en");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {i18n.language === "ar" ? "AR" : "EN"}
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
