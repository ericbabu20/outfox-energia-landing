import { useLayoutEffect } from "react";
import type { Locale } from "./i18n/messages";

export type PageKind = "home" | "privacy" | "cookies";

export function usePageShell(page: PageKind, locale: Locale) {
  useLayoutEffect(() => {
    const { body, documentElement } = document;
    body.dataset.page = page;
    body.dataset.locale = locale;
    body.classList.toggle("legal", page !== "home");
    documentElement.lang = locale;
  }, [page, locale]);
}

export function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute("content", content);
}
