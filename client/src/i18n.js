import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

i18n.on("languageChanged", (lang) => {
    if (lang === "ar") {
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
    }
});


export default i18n;
