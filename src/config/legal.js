// TODO: Legal to confirm the registry and the contact email before publishing.
// The production build fails while either value is empty or still a placeholder.
export const legal = {
  companyName: "Outfox Energia, S.L.",
  nif: "B44959922",
  address: "Avda. Alberto Alcocer 8, 2º A, 28036 Madrid",
  registry: "{REGISTRY – TO BE CONFIRMED}",
  email: "{EMAIL – TO BE CONFIRMED}",
  privacyEmail: "",
  dpoName: "",
  dpoEmail: "",
  // Privacy and cookie policies keep this date. The legal notice uses its own publish date.
  lastUpdated: "2026-10-30",
  noticePublished: "2026-11-10",
};

const placeholder = /TO BE CONFIRMED|POR CONFIRMAR|\{/;

/** Empty string when the legal notice is safe to publish. */
export function legalNoticePublishError() {
  const missing = [];
  if (!legal.registry.trim() || placeholder.test(legal.registry)) missing.push("registry");
  if (!legal.email.trim() || placeholder.test(legal.email) || !legal.email.includes("@")) missing.push("email");
  if (missing.length === 0) return "";
  return `Cannot publish the legal notice. Still unconfirmed in src/config/legal.js: ${missing.join(", ")}.`;
}

export function legalMarker(locale) {
  return locale === "es" ? "[POR CONFIRMAR]" : "[TO BE CONFIRMED]";
}

export function legalText(value, locale) {
  return value.trim() ? value.trim() : legalMarker(locale);
}
