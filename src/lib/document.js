import { useLayoutEffect } from "react";

export function usePageShell(page, locale) {
  useLayoutEffect(() => {
    const { body, documentElement } = document;
    body.dataset.page = page;
    body.dataset.locale = locale;
    body.classList.toggle("legal", page !== "home");
    documentElement.lang = locale;

    const media = window.matchMedia("(max-width: 1024px)");
    const syncOverflow = () => {
      body.style.overflowX = page === "home" ? "hidden" : "";
      body.style.overflowY = page === "home" && !media.matches ? "hidden" : "auto";
    };
    syncOverflow();
    media.addEventListener("change", syncOverflow);
    return () => {
      media.removeEventListener("change", syncOverflow);
      body.style.overflowX = "";
      body.style.overflowY = "";
    };
  }, [page, locale]);
}

export function setMeta(selector, content) {
  document.querySelector(selector)?.setAttribute("content", content);
}
