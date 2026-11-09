/**
 * Re-checked on 30 October 2026. This release does not collect personal data.
 * The site sets no document cookies and writes no localStorage or
 * sessionStorage keys. The language choice lives in the page address only.
 * Cookie-banner code can write "outfox-cookie-consent" only when a
 * non-essential cookie is listed below. This list is empty, so that code
 * does not run and the key is not written.
 * Do not add a row unless the site actually sets that cookie or storage key.
 *
 * Each item: { name, provider, purposeEs, purposeEn, type, party, duration }
 * type: "tecnica" | "preferencias" | "analitica" | "publicidad"
 * party: "propia" | "terceros"
 */
export const cookies = [];

export function nonEssentialCookies(list = cookies) {
  return list.filter((item) => item.type === "analitica" || item.type === "publicidad");
}
