export type CookieType = "tecnica" | "preferencias" | "analitica" | "publicidad";
export type CookieParty = "propia" | "terceros";

export interface SiteCookie {
  name: string;
  provider: string;
  purposeEs: string;
  purposeEn: string;
  type: CookieType;
  party: CookieParty;
  duration: string;
}

/**
 * Re-checked on 30 October 2026. This release does not collect personal data.
 * The site sets no document cookies and writes no localStorage or
 * sessionStorage keys. The language choice lives in the page address only.
 * Cookie-banner code can write "outfox-cookie-consent" only when a
 * non-essential cookie is listed below. This list is empty, so that code
 * does not run and the key is not written.
 * Do not add a row unless the site actually sets that cookie or storage key.
 */
export const cookies: SiteCookie[] = [];

export function nonEssentialCookies(list: SiteCookie[] = cookies): SiteCookie[] {
  return list.filter((item) => item.type === "analitica" || item.type === "publicidad");
}
