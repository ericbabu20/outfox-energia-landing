import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CookieConsent, hasStoredConsent } from "../components/CookieConsent";
import { Footer } from "../components/Footer";
import { LangToggle } from "../components/LangToggle";
import { nonEssentialCookies } from "../config/cookies";
import { setMeta, usePageShell } from "../lib/document";
import { consentCopy, legalDocument, type Block, type Inline } from "../lib/i18n/legal";
import { messages, type Locale } from "../lib/i18n/messages";
import { cookiesHref, homeHref, privacyHref } from "../lib/routes";

interface LegalPageProps {
  page: "privacy" | "cookies";
  locale: Locale;
}

const consentEnabled = nonEssentialCookies().length > 0;

export function LegalPage({ page, locale }: LegalPageProps) {
  const navigate = useNavigate();
  const copy = messages[locale];
  const doc = legalDocument(page, locale);
  const consent = consentCopy(locale);
  const [consentOpen, setConsentOpen] = useState(() => consentEnabled && !hasStoredConsent());

  usePageShell(page, locale);

  useEffect(() => {
    document.title = doc.documentTitle;
    setMeta('meta[name="description"]', doc.description);
  }, [doc.documentTitle, doc.description]);

  const switchLocale = (next: Locale) => {
    navigate(page === "privacy" ? privacyHref(next) : cookiesHref(next));
  };

  return (
    <>
      <a className="skip" href="#content">{copy.skip}</a>
      <header className="header">
        <Link className="brand" to={homeHref(locale)}>
          <img className="logo" src="/media/logo.svg" alt="Outfox Energía" />
        </Link>
        <LangToggle locale={locale} label={copy.langLabel} onSelect={switchLocale} />
      </header>

      <main className="policy" id="content">
        <h1>{doc.title}</h1>
        <p className="updated">{doc.updated}</p>
        <nav className="toc" aria-label={doc.tocLabel}>
          <p className="toc-title">{doc.tocLabel}</p>
          <ul>
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.heading}</a>
              </li>
            ))}
          </ul>
        </nav>
        {doc.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.heading}</h2>
            {section.blocks.map((block, index) => (
              <LegalBlock key={index} block={block} caption={section.heading} />
            ))}
          </section>
        ))}
      </main>

      <Footer
        locale={locale}
        cookieSettings={consentEnabled ? { label: consent.footerLink, onOpen: () => setConsentOpen(true) } : undefined}
      />

      {consentEnabled && <CookieConsent copy={consent} open={consentOpen} onClose={() => setConsentOpen(false)} />}
    </>
  );
}

function LegalBlock({ block, caption }: { block: Block; caption: string }) {
  if (block.kind === "p") {
    return (
      <p>
        <InlineParts parts={block.parts} />
      </p>
    );
  }
  if (block.kind === "ul") {
    return (
      <ul>
        {block.items.map((parts, index) => (
          <li key={index}>
            <InlineParts parts={parts} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="table-scroll" tabIndex={0}>
      <table>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {block.headers.map((label) => (
              <th key={label} scope="col">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InlineParts({ parts }: { parts: Inline[] }) {
  return parts.map((part, index) => {
    if (part.kind === "text") return <Fragment key={index}>{part.text}</Fragment>;
    if (part.external) {
      return (
        <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
          {part.text}
        </a>
      );
    }
    return (
      <a key={index} href={part.href}>
        {part.text}
      </a>
    );
  });
}
