import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { Footer } from "../components/Footer";
import { HeroBackground } from "../components/HeroBackground";
import { LangToggle } from "../components/LangToggle";
import { launchWindowEn, launchWindowEs } from "../config/launch";
import { setMeta, usePageShell } from "../lib/document";
import { playHeroEntrance } from "../lib/heroMotion";
import { messages, type Locale } from "../lib/i18n/messages";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locale: Locale = searchParams.get("lang") === "en" ? "en" : "es";
  const copy = messages[locale];
  const stageRef = useRef<HTMLDivElement>(null);

  usePageShell("home", locale);

  useEffect(() => {
    document.title = copy.metaTitle;
    setMeta('meta[name="description"]', copy.metaDescription);
    setMeta('meta[property="og:title"]', copy.metaTitle);
    setMeta('meta[property="og:description"]', copy.metaDescription);
    setMeta('meta[property="og:locale"]', locale === "es" ? "es_ES" : "en_GB");
    setMeta('meta[property="og:image"]', new URL("/media/artwork.webp", location.origin).href);
    setMeta('meta[property="og:image:alt"]', copy.ogImageAlt);
  }, [copy, locale]);

  useEffect(() => {
    if (!stageRef.current) return;
    return playHeroEntrance(stageRef.current);
  }, []);

  const windowText = (locale === "en" ? launchWindowEn : launchWindowEs).trim();
  const statusLabel = windowText ? `${copy.status} · ${windowText}` : copy.status;

  const selectLocale = (next: Locale) => {
    setSearchParams(next === "en" ? { lang: "en" } : {}, { replace: true });
  };

  return (
    <>
      <a className="skip" href="#content">{copy.skip}</a>
      <HeroBackground />
      <div className="stage" ref={stageRef}>
        <div className="frame">
          <header className="header">
            <div className="hero-logo">
              <img src="/media/logo-wordmark.png" alt="Outfox Energía" />
            </div>
            <LangToggle
              locale={locale}
              label={copy.langLabel}
              onSelect={selectLocale}
              className="lang pill glass rise"
            />
          </header>

          <div className="hero">
            <main className="copy" id="content">
              <div className="status pill glass" role="status" aria-label={statusLabel}>
                <span className="status-dot" aria-hidden="true" />
                <span className="status-label">{statusLabel}</span>
              </div>
              <h1>
                <span className="line"><span>{copy.h1a}</span></span>
                <span className="line"><span>{copy.h1b}</span></span>
              </h1>
              <p className="lead">{copy.lead}</p>
              <div className="stats">
                {copy.promises.map((promise, index) => (
                  <PromiseStat key={index} word={promise.word} caption={promise.caption} divider={index > 0} />
                ))}
              </div>
            </main>

            <div className="hero-side">
              <article className="card card-b glass rise">
                <div className="icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M5.5 15.2 16 6.2l10.5 9v11.2h-21V15.2Z" stroke="#9ff0ec" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M16.2 13.2 13.4 18h2.5l-1.1 4.6 4.8-6.2h-2.7l-0.7-3.2Z" fill="#bdf7ee" />
                  </svg>
                </div>
                <div>
                  <p className="kicker">{copy.cardBottomKicker}</p>
                  <h2>{copy.cardBottom}</h2>
                </div>
              </article>
              <div className="hero-fox" aria-hidden="true">
                <img src="/media/fox-blink.webp" alt="" width={512} height={768} />
              </div>
            </div>
          </div>

          <Footer locale={locale} />
        </div>
      </div>
    </>
  );
}

function PromiseStat({ word, caption, divider }: { word: string; caption: string; divider: boolean }) {
  return (
    <>
      {divider && <div className="hair" aria-hidden="true" />}
      <div className="stat rise">
        <b>{word}</b>
        <span>{caption}</span>
      </div>
    </>
  );
}
