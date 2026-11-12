export const legal = {
  companyName: "Outfox Energia, S.L.",
  nif: "B44959922",
  address: "Avda. Alberto Alcocer 8, 2º A, 28036 Madrid",
  // Fits "Registro Mercantil de …" and "Mercantile Registry of …".
  registry: {
    es: "Madrid, hoja M-894629",
    en: "Madrid, sheet M-894629",
  },
  soleDirector: "Alec Michael Bastian Jeronimo",
  privacyEmail: "",
  dpoName: "",
  dpoEmail: "",
  // The privacy policy keeps this date. The legal notice uses its own publish date.
  lastUpdated: "2026-11-12",
  noticePublished: "2026-11-12",
};

const placeholder = /TO BE CONFIRMED|POR CONFIRMAR|\{/;

export function legalRegistry(locale) {
  const value = legal.registry;
  const text = typeof value === "string" ? value : value?.[locale] || "";
  return text.trim() || legalMarker(locale);
}

/** Empty string when the legal notice is safe to publish. */
export function legalNoticePublishError() {
  const missing = [];
  for (const locale of ["es", "en"]) {
    const registry = legalRegistry(locale);
    if (!registry || registry.startsWith("[") || placeholder.test(registry)) missing.push(`registry.${locale}`);
  }
  if (missing.length === 0) return "";
  return `Cannot publish the legal notice. Still unconfirmed in src/config/legal.js: ${missing.join(", ")}.`;
}

export function legalMarker(locale) {
  return locale === "es" ? "[POR CONFIRMAR]" : "[TO BE CONFIRMED]";
}

export function legalText(value, locale) {
  return value.trim() ? value.trim() : legalMarker(locale);
}
