import en from "../../public/en.json";
import es from "../../public/es.json";

export const locales = ["en", "es"];
export const defaultLocale = "en";

const dictionaries = { en, es };

export function isLocale(lang) {
  return locales.includes(lang);
}

export function getDictionary(lang) {
  return dictionaries[isLocale(lang) ? lang : defaultLocale];
}

export function otherLocale(lang) {
  return lang === "es" ? "en" : "es";
}
