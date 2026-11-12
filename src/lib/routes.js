export function privacyHref(locale) {
  return locale === "en" ? "/en/privacy" : "/es/privacidad";
}

export function legalNoticeHref(locale) {
  return locale === "en" ? "/en/legal-notice" : "/es/aviso-legal";
}

export function homeHref(locale) {
  return locale === "en" ? "/?lang=en" : "/";
}
