// TODO: Legal to confirm
export const legal = {
  companyName: "",
  nif: "",
  address: "",
  privacyEmail: "",
  dpoName: "",
  dpoEmail: "",
  lastUpdated: "2026-10-30",
};

export function legalMarker(locale) {
  return locale === "es" ? "[POR CONFIRMAR]" : "[TO BE CONFIRMED]";
}

export function legalText(value, locale) {
  return value.trim() ? value.trim() : legalMarker(locale);
}
