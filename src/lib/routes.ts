import type { Locale } from "./i18n/messages.js";

export function privacyHref(locale: Locale): string {
  return locale === "en" ? "/en/privacy" : "/es/privacidad";
}

export function cookiesHref(locale: Locale): string {
  return locale === "en" ? "/en/cookies" : "/es/cookies";
}

export function homeHref(locale: Locale): string {
  return locale === "en" ? "/?lang=en" : "/";
}
