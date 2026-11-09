export interface LegalConfig {
  companyName: string;
  nif: string;
  address: string;
  privacyEmail: string;
  dpoName: string;
  dpoEmail: string;
  lastUpdated: string;
}

// TODO: Legal to confirm
export const legal: LegalConfig = {
  companyName: "",
  nif: "",
  address: "",
  privacyEmail: "",
  dpoName: "",
  dpoEmail: "",
  lastUpdated: "2026-10-30",
};

export function legalMarker(locale: "es" | "en"): string {
  return locale === "es" ? "[POR CONFIRMAR]" : "[TO BE CONFIRMED]";
}

export function legalText(value: string, locale: "es" | "en"): string {
  return value.trim() ? value.trim() : legalMarker(locale);
}
