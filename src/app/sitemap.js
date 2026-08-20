const BASE = "https://portfolio-laureano.vercel.app";

export default function sitemap() {
  const languages = { en: `${BASE}/en`, es: `${BASE}/es` };

  return ["en", "es"].map((lang) => ({
    url: `${BASE}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
