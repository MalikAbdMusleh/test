import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const en_home = require("./public/locales/en/common.json");
const ar_home = require("./public/locales/ar/common.json");

const availableLanguages = ["en", "ar"]; // List of available languages

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  whitelist: availableLanguages,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: en_home,
    },
    ar: {
      common: ar_home,
    },
  },
});

export default i18n;
